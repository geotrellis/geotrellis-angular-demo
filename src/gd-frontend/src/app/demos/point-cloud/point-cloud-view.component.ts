import { Component } from '@angular/core';
import { PointCloudDemoService } from './point-cloud-demo.service';
import { POINTCLOUDDEMO } from './point-cloud-demo';
import * as chroma from 'chroma-js';

@Component({
  selector: 'gd-test',
  templateUrl: './point-cloud-view.component.html'
})

export class PointCloudViewComponent {
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
}
