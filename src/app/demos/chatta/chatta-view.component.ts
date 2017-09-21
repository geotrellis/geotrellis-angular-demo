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
  mapOptions = {
    zoom: CHATTADEMO.zoom,
    center: CHATTADEMO.center,
    layers: CHATTADEMO.baseLayer,
  };
  layerCards = CHATTADEMO.layers;
}
