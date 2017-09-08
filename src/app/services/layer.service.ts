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
        let url = card.server;
        switch (card.info.name) {
            case 'lm':
                return this._http.get(`https://geotrellis.io/gt/weighted-overlay/breaks`, {
                    params: new HttpParams()
                        .set('layers', `${card.params.layers}`)
                        .set('weights', `${card.values}`)
                        .set('numBreaks', '20')
                })
                    .debounceTime(500)
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
                    .debounceTime(500)
                    .retry(3)
                    .map(response => response['classBreaks'])
                    .map(res => {
                        return L.tileLayer.wms(card.server, {
                            breaks: res,
                            layers: card.params.layers,
                            format: 'image/png',
                            weights: card.values,
                            mask: card.mask ? card.mask : '',
                            colorRamp: card.palette,
                            transparent: true,
                            attribution: 'Azavea',
                        });
                    });
            case 'creation-render':
                url = card.server
                    .replace('{values[0]}', `${card.values[0]}`)
                    .replace('{values[1]}', `${card.values[1]}`)
                    .replace('{values[2]}', `${card.values[2]}`);
                return new Observable<L.TileLayer>(observer => observer.next(L.tileLayer(url)))
                    .debounceTime(500)
                    .retry(3)
                    .map(res => res);
            case 'change-detection':
                return new Observable<L.TileLayer>(observer => observer.next(L.tileLayer(card.server)))
                    .debounceTime(500)
                    .retry(3)
                    .map(res => res);
            case 'potsdam-imagery':
                url = card.server
                    .replace('{values[0]}', `${card.values[0]}`)
                    .replace('{values[1]}', `${card.values[1]}`);
                return new Observable<L.TileLayer>(observer => observer.next(L.tileLayer(url)))
                    .debounceTime(500)
                    .retry(3)
                    .map(res => res);
            case 'potsdam-dsm':
                url = card.server
                    .replace('{values[0]}', `${card.values[0]}`);
                return new Observable<L.TileLayer>(observer => observer.next(L.tileLayer(url)))
                    .debounceTime(500)
                    .retry(3)
                    .map(res => res);
            case 'potsdam-dsm-gtn':
                url = card.server
                    .replace('{values[0]}', `${card.values[0]}`);
                return new Observable<L.TileLayer>(observer => observer.next(L.tileLayer(url)))
                    .debounceTime(500)
                    .retry(3)
                    .map(res => res);
            case 'potsdam-labels':
                return new Observable<L.TileLayer>(observer => observer.next(L.tileLayer(url)))
                    .debounceTime(500)
                    .retry(3)
                    .map(res => res);
            case 'potsdam-unet-predictions':
                url = card.server
                    .replace('{values[0]}', `${card.values[0]}`)
                    .replace('{values[1]}', `${card.values[1]}`);
                return new Observable<L.TileLayer>(observer => observer.next(L.tileLayer(url)))
                    .debounceTime(500)
                    .retry(3)
                    .map(res => res);
            case 'potsdam-unet-probabilities':
                url = card.server
                    .replace('{values[0]}', `${card.values[0]}`);
                return new Observable<L.TileLayer>(observer => observer.next(L.tileLayer(url)))
                    .debounceTime(500)
                    .retry(3)
                    .map(res => res);
            case 'potsdam-fcn-predictions':
                url = card.server
                    .replace('{values[0]}', `${card.values[0]}`)
                    .replace('{values[1]}', `${card.values[1]}`);
                return new Observable<L.TileLayer>(observer => observer.next(L.tileLayer(url)))
                    .debounceTime(500)
                    .retry(3)
                    .map(res => res);
            case 'potsdam-fcn-probabilities':
                url = card.server
                    .replace('{values[0]}', `${card.values[0]}`);
                return new Observable<L.TileLayer>(observer => observer.next(L.tileLayer(url)))
                    .debounceTime(500)
                    .retry(3)
                    .map(res => res);
            case 'potsdam-fcndsm-predictions':
                url = card.server
                    .replace('{values[0]}', `${card.values[0]}`)
                    .replace('{values[1]}', `${card.values[1]}`);
                return new Observable<L.TileLayer>(observer => observer.next(L.tileLayer(url)))
                    .debounceTime(500)
                    .retry(3)
                    .map(res => res);
            case 'potsdam-fcndsm-probabilities':
                url = card.server
                    .replace('{values[0]}', `${card.values[0]}`);
                return new Observable<L.TileLayer>(observer => observer.next(L.tileLayer(url)))
                    .debounceTime(500)
                    .retry(3)
                    .map(res => res);
            case 'potsdam-fcn-unet':
                return new Observable<L.TileLayer>(observer => observer.next(L.tileLayer(url)))
                    .debounceTime(500)
                    .retry(3)
                    .map(res => res);
            case 'potsdam-fcn-fcndsm':
                return new Observable<L.TileLayer>(observer => observer.next(L.tileLayer(url)))
                    .debounceTime(500)
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
        let type: string;
        if (card.model === 'point-cloud' && !card.mask.hasOwnProperty('lat')) {
            type = 'poly';
            mask = JSON.stringify(Object.assign(JSON.parse(card.mask), {
                geometry: {
                    type: 'Polygon',
                    coordinates: JSON.parse(card.mask).geometry.coordinates.map(datum => datum.map(data => data.reverse()))
                }
            }));
        } else { type = 'point'; }
        switch (name) {
            case 'chatta':
                return this._http.get(`http://demo.geotrellis.com/chatta/gt/sum`, {
                    params: new HttpParams()
                        .set('layers', 'ImperviousSurfaces_Barren Lands_Open Water,DevelopedLand,Wetlands,ForestedLands,Non-workingProtectedOrPublicLands,PublicallyOwnedWorkingLands,PrivatelyOwnedWorkingLandsWithEasements,FarmlandWithoutPrimeAgriculturalSoils,FarmlandOrForestedLandsWithPrimeAgriculturalSoils')
                        .set('weights', `${values}`)
                        .set('polygon', `${mask}`)
                })
                    .debounceTime(500)
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
                url = `http://ec2-54-87-204-186.compute-1.amazonaws.com/api/stats/${type}/single/{values[2]}{values[0]}/{zoom}`
                    .replace('{values[0]}', `${values[0]}`)
                    .replace('{values[2]}', `${values[2]}`)
                    .replace('{zoom}', `${zoom}`);
                if (card.mask.hasOwnProperty('lat')) {
                    return this._http.get(url, {
                        params: new HttpParams()
                            .set('lat', `${mask.lat}`)
                            .set('lng', `${mask.lng}`)
                    })
                        .debounceTime(500)
                        .retry(3)
                        .map(res => res);
                } else {
                    return this._http.get(url, {
                        params: new HttpParams()
                            .set('poly', `${mask}`)
                    })
                        .debounceTime(500)
                        .retry(3)
                        .map(res => res);
                }


            case 'change-detection':
                url = `http://ec2-54-87-204-186.compute-1.amazonaws.com/api/stats/${type}/diff/mar10{values[0]}/jul10{values[0]}/{zoom}`
                    .replace('{values[0]}', `${values[0]}`)
                    .replace('{values[0]}', `${values[0]}`)
                    .replace('{zoom}', `${zoom}`);
                if (card.mask.hasOwnProperty('lat')) {
                    return this._http.get(url, {
                        params: new HttpParams()
                            .set('lat', `${mask.lat}`)
                            .set('lng', `${mask.lng}`)
                    })
                        .debounceTime(500)
                        .retry(3)
                        .map(res => res);
                } else {
                    return this._http.get(url, {
                        params: new HttpParams()
                            .set('poly', `${mask}`)
                    })
                        .debounceTime(500)
                        .retry(3)
                        .map(res => res);
                }
            default:
                break;
        }
    }
}
