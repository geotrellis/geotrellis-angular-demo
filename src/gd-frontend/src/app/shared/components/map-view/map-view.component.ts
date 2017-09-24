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
  @Input() groupActions: any = {};
  @Input() demoConfig: {
    title: string;
    zoom: number;
    center: number[];
    layers: L.TileLayer[];
  };
  @Input() title: string;
  @Input() sidebarConfig: {
    title: string;
    groupActions: any;
    layerCards: LayerCard[];
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
      zoom: this.demoConfig.zoom,
      center: this.demoConfig.center,
      layers: this.demoConfig.layers,
    });
  }
  ngAfterViewInit() {
    this.cd.detectChanges();
  }
}
