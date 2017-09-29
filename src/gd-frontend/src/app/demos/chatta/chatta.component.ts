import { Component } from '@angular/core';
import { ChattaService } from './chatta.service';
import { CHATTADEMO } from './chatta-demo';
import * as chroma from 'chroma-js';

@Component({
  selector: 'gd-demo',
  templateUrl: '../demo.component.html'
})

export class ChattaComponent {
  demoConfig = {
    zoom: CHATTADEMO.zoom,
    center: CHATTADEMO.center,
    layers: CHATTADEMO.baseLayer,
  };
  sidebarConfig = {
    title: CHATTADEMO.title,
    groupActions: CHATTADEMO.groupActions,
    layerCards: CHATTADEMO.layers,
  };
  service: any;
  constructor(
    service: ChattaService
  ) {
    this.service = service.getService();
  }
}
