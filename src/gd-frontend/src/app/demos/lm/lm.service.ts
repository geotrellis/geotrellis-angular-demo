import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/debounceTime';
import { Observable } from 'rxjs/Observable';
import * as L from 'leaflet';

@Injectable()
export class LmService {
  constructor(
    public http: HttpClient,
  ) { }

  getService = () => {
    return {
      getLayer: this.getLayer,
      getSummary: this.getSummary,
    };
  }

  getLayer = (card: GD.LayerCard) => {
    return this.http.get(`https://cors-anywhere.herokuapp.com/https://geotrellis.io/gt/weighted-overlay/breaks`, {
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
  }

  getSummary(card: GD.LayerCard): Observable<any> {
    return null;
  }
}
