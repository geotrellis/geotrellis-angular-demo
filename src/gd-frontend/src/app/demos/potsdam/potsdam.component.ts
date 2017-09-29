import { Component } from '@angular/core';
import { PotsdamService } from './potsdam.service';
import { POTSDAMDEMO } from './potsdam-demo';
import * as chroma from 'chroma-js';

@Component({
  selector: 'gd-demo',
  templateUrl: '../demo.component.html'
})

export class PotsdamComponent {
  layer: L.Layer;
  demoConfig = {
    zoom: POTSDAMDEMO.zoom,
    center: POTSDAMDEMO.center,
    layers: POTSDAMDEMO.baseLayer,
  };
  sidebarConfig = {
    title: POTSDAMDEMO.title,
    groupActions: POTSDAMDEMO.groupActions,
    layerCards: POTSDAMDEMO.layers,
  };
  service: any;
  constructor(
    service: PotsdamService
  ) {
    this.service = service.getService();
  }
}
