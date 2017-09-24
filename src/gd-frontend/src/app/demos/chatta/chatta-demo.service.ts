import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/debounceTime';
import { Observable } from 'rxjs/Observable';
import { LayerCard } from '../../shared/models/layer-card.d';

import * as L from 'leaflet';
import { CHATTADEMO } from './chatta-demo';
@Injectable()
export class ChattaDemoService {

  constructor(
    private http: HttpClient,
  ) { }

  getMapConfig(): Promise<{
    zoom: number;
    center: number[];
    baseLayer: L.TileLayer[];
  }> {
    return Promise.resolve({
      zoom: CHATTADEMO.zoom,
      center: CHATTADEMO.center,
      baseLayer: CHATTADEMO.baseLayer
    });
  }

  getLayer(card: LayerCard): Observable<L.TileLayer> {
    return this.http.get(`https://cors-anywhere.herokuapp.com/http://demo.geotrellis.com/chatta/gt/breaks`, {
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
  }

  getSummary(card: LayerCard, values: string[] | number[], zoom: number): Observable<any> {
    const mask = card.mask;
    return this.http.get(`https://cors-anywhere.herokuapp.com/http://demo.geotrellis.com/chatta/gt/sum`, {
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
      }
    );
  }
}
