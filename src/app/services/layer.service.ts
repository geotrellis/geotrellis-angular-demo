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

    getLayer(card: LayerCard): Observable<L.Layer> {
        switch (card.info.name) {
            case 'lm':
                return this._http.get(`https://geotrellis.io/gt/weighted-overlay/breaks`, {
                    params: new HttpParams()
                        .set('layers', 'philly_bars,philly_grocery_stores,philly_rail_stops')
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
                            pane: card.info.name
                        });
                    });

            case 'chatta':
                return this._http.get(`http://demo.geotrellis.com/chatta/gt/breaks`, {
                    params: new HttpParams()
                        .set('layers', 'ImperviousSurfaces_Barren Lands_Open Water,DevelopedLand,Wetlands,ForestedLands,Non-workingProtectedOrPublicLands,PublicallyOwnedWorkingLands,PrivatelyOwnedWorkingLandsWithEasements,FarmlandWithoutPrimeAgriculturalSoils,FarmlandOrForestedLandsWithPrimeAgriculturalSoils')
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
                            transparent: true,
                            attribution: 'Azavea',
                            pane: card.info.name
                        });
                    });
            default:
                break;
        }
    }

    getSummary(name: string, values: number[] | string[], polygon: string): Observable<any> {
        switch (name) {
            case 'chatta':
                return this._http.get(`http://demo.geotrellis.com/chatta/gt/sum`, {
                    params: new HttpParams()
                        .set('layers', 'ImperviousSurfaces_Barren Lands_Open Water,DevelopedLand,Wetlands,ForestedLands,Non-workingProtectedOrPublicLands,PublicallyOwnedWorkingLands,PrivatelyOwnedWorkingLandsWithEasements,FarmlandWithoutPrimeAgriculturalSoils,FarmlandOrForestedLandsWithPrimeAgriculturalSoils')
                        .set('weights', `${values}`)
                        .set('polygon', `${polygon}`)
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
            default:
                break;
        }
    }
}
