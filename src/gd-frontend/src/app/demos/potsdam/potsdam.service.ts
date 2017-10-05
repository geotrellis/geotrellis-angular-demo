import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/debounceTime';
import { Observable } from 'rxjs/Observable';
import * as L from 'leaflet';

@Injectable()
export class PotsdamService {

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
    let url = card.server;
    switch (card.info.name) {
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

  getSummary = (card: GD.LayerCard, values: string[] | number[], zoom: number) => {
    return null;
  }
}
