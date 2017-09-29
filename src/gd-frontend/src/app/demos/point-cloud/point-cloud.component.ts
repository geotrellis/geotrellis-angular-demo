import { Component } from '@angular/core';
import { PointCloudService } from './point-cloud.service';
import { POINTCLOUDDEMO } from './point-cloud-demo';
import * as chroma from 'chroma-js';

@Component({
  selector: 'gd-demo',
  templateUrl: '../demo.component.html'
})

export class PointCloudComponent {
  layer: L.Layer;
  demoConfig = {
    zoom: POINTCLOUDDEMO.zoom,
    center: POINTCLOUDDEMO.center,
    layers: POINTCLOUDDEMO.baseLayer,
  };
  sidebarConfig = {
    title: POINTCLOUDDEMO.title,
    groupActions: POINTCLOUDDEMO.groupActions,
    layerCards: POINTCLOUDDEMO.layers,
  };
  service: any;
  constructor(
    service: PointCloudService
  ) {
    this.service = service.getService();
  }
}
