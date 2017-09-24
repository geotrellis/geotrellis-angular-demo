import { Component } from '@angular/core';
import { ChattaDemoService } from './chatta-demo.service';
import { CHATTADEMO } from './chatta-demo';
import * as chroma from 'chroma-js';

@Component({
  selector: 'gd-test',
  templateUrl: './chatta-view.component.html'
})

export class ChattaViewComponent {
  layer: L.Layer;
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
}
