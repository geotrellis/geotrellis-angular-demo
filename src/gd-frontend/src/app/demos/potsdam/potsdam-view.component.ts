import { Component } from '@angular/core';
import { PotsdamDemoService } from './potsdam-demo.service';
import { POTSDAMDEMO } from './potsdam-demo';
import * as chroma from 'chroma-js';

@Component({
  selector: 'gd-test',
  templateUrl: './potsdam-view.component.html'
})

export class PotsdamViewComponent {
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
}
