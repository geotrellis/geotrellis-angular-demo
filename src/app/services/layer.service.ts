import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/debounceTime';

@Injectable()
export class LayerService {

    constructor(
        private _http: HttpClient
    ) { }

    getBreaks(name: string, weights: number[]): any {
        switch (name) {
            case 'lm':
                return this._http.get(`https://geotrellis.io/gt/weighted-overlay/breaks`, {
                    params: new HttpParams()
                        .set('layers', 'philly_bars,philly_grocery_stores,philly_rail_stops')
                        .set('weights', `${weights}`)
                        .set('numBreaks', '20')
                })
                    .debounceTime(1000)
                    .retry(3)
                    .map(response => response['classBreaks']);
                    case 'chatta':
                return this._http.get(`http://demo.geotrellis.com/chatta/gt/breaks`, {
                    params: new HttpParams()
                        .set('layers', 'ImperviousSurfaces_Barren Lands_Open Water,DevelopedLand,Wetlands,ForestedLands,Non-workingProtectedOrPublicLands,PublicallyOwnedWorkingLands,PrivatelyOwnedWorkingLandsWithEasements,FarmlandWithoutPrimeAgriculturalSoils,FarmlandOrForestedLandsWithPrimeAgriculturalSoils')
                        .set('weights', `${weights}`)
                        .set('numBreaks', '10')
                })
                    .debounceTime(1000)
                    .retry(3)
                    .map(response => response['classBreaks']);
            default:
                break;
        }
    }

    getSummary(name: string, weights: number[], polygon: string): any {
        switch (name) {
            case 'chatta':
                return this._http.get(`http://demo.geotrellis.com/chatta/gt/sum`, {
                    params: new HttpParams()
                        .set('layers', 'ImperviousSurfaces_Barren Lands_Open Water,DevelopedLand,Wetlands,ForestedLands,Non-workingProtectedOrPublicLands,PublicallyOwnedWorkingLands,PrivatelyOwnedWorkingLandsWithEasements,FarmlandWithoutPrimeAgriculturalSoils,FarmlandOrForestedLandsWithPrimeAgriculturalSoils')
                        .set('weights', `${weights}`)
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
