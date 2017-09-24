import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/debounceTime';
import { Observable } from 'rxjs/Observable';
import { LayerCard } from '../../shared/models/layer-card.d';

import * as L from 'leaflet';
import { POINTCLOUDDEMO } from './point-cloud-demo';
@Injectable()
export class PointCloudDemoService {

  constructor(
    private http: HttpClient,
  ) { }

  getMapConfig(): Promise<{
    zoom: number;
    center: number[];
    baseLayer: L.TileLayer[];
  }> {
    return Promise.resolve({
      zoom: POINTCLOUDDEMO.zoom,
      center: POINTCLOUDDEMO.center,
      baseLayer: POINTCLOUDDEMO.baseLayer
    });
  }

  getLayer(card: LayerCard): Observable<L.TileLayer> {
    switch (card.info.name) {
      case 'creation-render':
        return new Observable<L.TileLayer>(observer => observer.next(L.tileLayer(
          card.server
            .replace('{values[0]}', `${card.values[0]}`)
            .replace('{values[1]}', `${card.values[1]}`)
            .replace('{values[2]}', `${card.values[2]}`)
        )))
          .debounceTime(500)
          .retry(3)
          .map(res => res);
      case 'change-detection':
        return new Observable<L.TileLayer>(observer => observer.next(L.tileLayer(card.server)))
          .debounceTime(500)
          .retry(3)
          .map(res => res);
      default:
        break;
    }
  }

  getSummary(card: LayerCard, values: string[] | number[], zoom: number): Observable<any> {
    let mask = card.mask;
    let url: string;
    let type: string;
    if (!card.mask.hasOwnProperty('lat')) {
      type = 'poly';
      mask = JSON.stringify(Object.assign(JSON.parse(card.mask), {
        geometry: {
          type: 'Polygon',
          coordinates: JSON.parse(card.mask).geometry.coordinates.map(datum => datum.map(data => data.reverse()))
        }
      }));
    } else { type = 'point'; }
    switch (card.info.name) {
      case 'creation-render':
        url = `https://cors-anywhere.herokuapp.com/http://ec2-54-87-204-186.compute-1.amazonaws.com/api/stats/${type}/single/{values[2]}{values[0]}/{zoom}`
          .replace('{values[0]}', `${values[0]}`)
          .replace('{values[2]}', `${values[2]}`)
          .replace('{zoom}', `${zoom}`);
        if (card.mask.hasOwnProperty('lat')) {
          return this.http.get(url, {
            params: new HttpParams()
              .set('lat', `${mask.lat}`)
              .set('lng', `${mask.lng}`)
          })
            .debounceTime(500)
            .retry(3)
            .map(res => res);
        } else {
          return this.http.get(url, {
            params: new HttpParams()
              .set('poly', `${mask}`)
          })
            .debounceTime(500)
            .retry(3)
            .map(res => res);
        }

      case 'change-detection':
        url = `https://cors-anywhere.herokuapp.com/http://ec2-54-87-204-186.compute-1.amazonaws.com/api/stats/${type}/diff/mar10{values[0]}/jul10{values[0]}/{zoom}`
          .replace('{values[0]}', `${values[0]}`)
          .replace('{values[0]}', `${values[0]}`)
          .replace('{zoom}', `${zoom}`);
        if (card.mask.hasOwnProperty('lat')) {
          return this.http.get(url, {
            params: new HttpParams()
              .set('lat', `${mask.lat}`)
              .set('lng', `${mask.lng}`)
          })
            .debounceTime(500)
            .retry(3)
            .map(res => res);
        } else {
          return this.http.get(url, {
            params: new HttpParams()
              .set('poly', `${mask}`)
          })
            .debounceTime(500)
            .retry(3)
            .map(res => res);
        }
    }
  }
}
