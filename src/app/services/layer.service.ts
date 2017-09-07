import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/debounceTime';
import { Observable } from 'rxjs/Observable';

import * as L from 'leaflet';

import { LayerCard } from '../layer-card.d';

@Injectable()
export class LayerService {

    constructor(
        private _http: HttpClient
    ) { }

    getLayer(card: LayerCard): Observable<L.TileLayer> {
        switch (card.info.name) {
            case 'lm':
                return this._http.get(`https://geotrellis.io/gt/weighted-overlay/breaks`, {
                    params: new HttpParams()
                        .set('layers', `${card.params.layers}`)
                        .set('weights', `${card.values}`)
                        .set('numBreaks', '20')
                })
                    .debounceTime(1000)
                    .retry(3)
                    .map(response => response['classBreaks'])
                    .map(res => {
                        return L.tileLayer.wms(card.server, {
                            breaks: res,
                            layers: card.params.layers,
                            format: 'image/png',
                            weights: card.values,
                            transparent: true,
                            attribution: 'Azavea',
                            uppercase: true,
                        });
                    });

            case 'chatta':
                return this._http.get(`http://demo.geotrellis.com/chatta/gt/breaks`, {
                    params: new HttpParams()
                        .set('layers', `${card.params.layers}`)
                        .set('weights', `${card.values}`)
                        .set('numBreaks', '10')
                })
                    .debounceTime(1000)
                    .retry(3)
                    .map(response => response['classBreaks'])
                    .map(res => {
                        return L.tileLayer.wms(card.server, {
                            breaks: res,
                            layers: card.params.layers,
                            format: 'image/png',
                            weights: card.values,
                            mask: card.mask,
                            colorRamp: card.palette,
                            transparent: true,
                            attribution: 'Azavea',
                        });
                    });
            case 'creation-render':
                const url = card.server.replace('values[0]', `${card.values[0]}`)
                    .replace('values[1]', `${card.values[1]}`)
                    .replace('values[2]', `${card.values[2]}`);
                return new Observable<L.TileLayer>(observer => observer.next(L.tileLayer(url)))
                    .debounceTime(1000)
                    .retry(3)
                    .map(res => res);
            case 'change-detection':
                return new Observable<L.TileLayer>(observer => observer.next(L.tileLayer(card.server)))
                    .debounceTime(1000)
                    .retry(3)
                    .map(res => res);
            default:
                break;
        }
    }

    getSummary(card: LayerCard, values: string[] | number[], zoom: number): Observable<any> {
        const name = card.info.name;
        let mask = card.mask;
        let url: string;
        if (card.model === 'pointcloud') {
            mask = JSON.stringify(Object.assign(JSON.parse(card.mask), {
                geometry: {
                    type: 'Polygon',
                    coordinates: JSON.parse(card.mask).geometry.coordinates.map(datum => datum.map(data => data.reverse()))
                }
            }));
        }
        switch (name) {
            case 'chatta':
                return this._http.get(`http://demo.geotrellis.com/chatta/gt/sum`, {
                    params: new HttpParams()
                        .set('layers', 'ImperviousSurfaces_Barren Lands_Open Water,DevelopedLand,Wetlands,ForestedLands,Non-workingProtectedOrPublicLands,PublicallyOwnedWorkingLands,PrivatelyOwnedWorkingLandsWithEasements,FarmlandWithoutPrimeAgriculturalSoils,FarmlandOrForestedLandsWithPrimeAgriculturalSoils')
                        .set('weights', `${values}`)
                        .set('polygon', `${mask}`)
                })
                    .debounceTime(1000)
                    .retry(3)
                    .map(response => {
                        return {
                            // reversed array
                            layers: <string[]>response['layerSummaries'].reverse().map(el => {
                                return Number(el['total']);
                            }),
                            total: Number(response['total'])
                        };
                    });

            case 'creation-render':

                url = 'http://ec2-54-87-204-186.compute-1.amazonaws.com/api/stats/poly/single/values[2]values[0]/zoom'
                    .replace('values[0]', `${values[0]}`)
                    .replace('values[2]', `${values[2]}`)
                    .replace('zoom', `${zoom}`);
                return this._http.get(url, {
                    params: new HttpParams()
                        .set('poly', `${mask}`)
                })
                    .debounceTime(1000)
                    .retry(3)
                    .map(res => res);

            case 'change-detection':
            console.log('change-detection');

                url = 'http://ec2-54-87-204-186.compute-1.amazonaws.com/api/stats/poly/diff/mar10values[0]/jul10values[0]/zoom'
                    .replace('values[0]', `${values[0]}`)
                    .replace('values[0]', `${values[0]}`)
                    .replace('zoom', `${zoom}`);
                return this._http.get(url, {
                    params: new HttpParams()
                        .set('poly', `${mask}`)
                })
                    .debounceTime(1000)
                    .retry(3)
                    .map(res => res);
            default:
                break;
        }
    }
}
