import { Component } from '@angular/core';
import { LmService } from './lm.service';
import { LMDEMO } from './lm-demo';
import * as chroma from 'chroma-js';

@Component({
  selector: 'gd-demo',
  templateUrl: '../demo.component.html'
})

export class LmComponent {
  demoConfig = {
    zoom: LMDEMO.zoom,
    center: LMDEMO.center,
    layers: LMDEMO.baseLayer,
  };
  sidebarConfig = {
    title: LMDEMO.title,
    groupActions: LMDEMO.groupActions,
    layerCards: LMDEMO.layers,
  };
  service: any;
  constructor(
    service: LmService
  ) {
    this.service = service.getService();
  }
}
