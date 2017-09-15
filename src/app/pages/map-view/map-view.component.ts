import 'rxjs/add/operator/switchMap';

import { Component, ChangeDetectorRef, HostBinding, OnChanges, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { LayerCard } from '../../shared/models/layer-card.d';
import { CardService } from '../../shared/services/card.service';

import * as L from 'leaflet';

@Component({
  selector: 'gd-map-view',
  templateUrl: './map-view.component.html'
})
export class MapViewComponent implements AfterViewInit {
  @HostBinding('class.map-view') true;
  hasMask = false;
  map: L.Map;
  cards: LayerCard[] = [];
  mask: any;
  options = {
    layers: [
      L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 19
      })
    ],
    zoom: undefined,
    center: undefined,
    zoomControl: false
  };

  resetArea(): void {
    this.map.eachLayer(el => {
      if (el.hasOwnProperty('editing')) {
        this.map.removeLayer(el);
      }
    });
    this.mask = undefined;
    // when reset area should clean the previous summary data;
    this.cards.forEach(el => {
      if (el.hasOwnProperty('summary')) {
        el.summary = undefined;
        el.expanded = undefined;
      }
    });
    this.hasMask = false;
  }

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
  ) {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.cardService.getCards(params.get('name')))
      .subscribe(cards => {
        this.cards = cards;
        this.options = Object.assign({}, this.options, {
          zoom: cards[0].info.zoom,
          center: cards[0].info.center
        });
        if (this.cards[0].model === 'point-cloud') {
          this.options.layers = [
            L.tileLayer('http://tile.stamen.com/terrain-background/{z}/{x}/{y}@2x.{ext}', {
              attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
              subdomains: 'abcd',
              minZoom: 0,
              maxZoom: 20,
              ext: 'jpg',
              opacity: 0.6,
            }),
            L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}@2x.{ext}', {
              attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
              subdomains: 'abcd',
              minZoom: 0,
              maxZoom: 20,
              ext: 'png',
              opacity: 0.4,
            })
          ];
        }
      });
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }
}
