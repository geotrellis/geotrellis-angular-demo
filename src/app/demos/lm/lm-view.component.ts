import { Component } from '@angular/core';
import { LmDemoService } from './lm-demo.service';
import { LMDEMO } from './lm-demo';
import * as chroma from 'chroma-js';

@Component({
  selector: 'gd-test',
  templateUrl: './lm-view.component.html'
})

export class LmViewComponent {
  layer: L.Layer;
  mapOptions = {
    zoom: LMDEMO.zoom,
    center: LMDEMO.center,
    layers: LMDEMO.baseLayer,
  };
  layerCards = LMDEMO.layers;
}
