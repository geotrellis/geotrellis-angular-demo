import 'rxjs/add/operator/switchMap';

import { Component, Input, ChangeDetectorRef, HostBinding, AfterViewInit, OnInit } from '@angular/core';

import { LayerCard } from '../../models/layer-card.d';
import { LayerService } from '../../services/layer.service';

import * as L from 'leaflet';

@Component({
  selector: 'gd-map-view',
  templateUrl: './map-view.component.html'
})

export class MapViewComponent implements OnInit, AfterViewInit {
  @HostBinding('class.map-view') true;
  @Input() cards: LayerCard[] = [];
  @Input() mapOptions: {
    zoom: number;
    center: number[];
    layers: L.TileLayer[];
  };

  hasMask = false;
  map: L.Map;
  mask: any;
  options = {
    layers: [],
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
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.options = Object.assign({}, this.options, {
      zoom: this.mapOptions.zoom,
      center: this.mapOptions.center,
      layers: this.mapOptions.layers,
    });
  }
  ngAfterViewInit() {
    this.cd.detectChanges();
  }
}
