import * as chroma from 'chroma-js';
import * as L from 'leaflet';

import { Demo } from '../../shared/models/demo.d';
export const LMDEMO: Demo = {
  model: 'lm',
  title: 'Philly Location Modeling',
  thumb: 'https://geotrellis.io/gt/weighted-overlay/wms?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&LAYERS=philly_bars%2Cphilly_grocery_stores%2Cphilly_rail_stops&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=true&HEIGHT=256&WIDTH=256&BREAKS=-41%2C-12%2C0%2C8%2C21%2C32%2C43%2C52%2C62%2C71%2C80%2C91%2C102%2C115%2C129%2C144%2C159%2C177%2C202%2C298&WEIGHTS=2%2C1%2C-2&SRS=EPSG%3A3857&BBOX=-8375052.315150191,4852834.051769271,-8365268.375529689,4862617.991389772',
  zoom: 11,
  center: [39.992114502787494, -75.13412475585939],
  baseLayer: [L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 19
  })],
  layers: [{
    info: {
      name: 'lm',
      title: 'Philly Location Modeling',
      presets: [
        {
          value: [3, -3, 0],
          text: 'NEAR Bars, BUT NOT Grocery Stores'
        }, {
          value: [0, -3, 3],
          text: 'NEAR Grocery Stores, BUT NOT Bars'
        }, {
          value: [0, -3, 3],
          text: 'NEAR Rail Stops, BUT NOT Grocery Stores'
        }, {
          value: [3, 0, 0],
          text: 'NEAR Bars'
        }, {
          value: undefined,
          text: 'Custom'
        }
      ],
      actions: ['info', 'weight', 'opacity'],
      infotext: 'This model uses the weighted overlay method, which break the location selection problem into three factors.',
      prtext: ['bars', 'grocery_stores', 'rail_stops'],
      range: 4,
    },
    expanded: undefined,
    params: {
      layers: 'philly_bars,philly_grocery_stores,philly_rail_stops'
    },
    values: [3, -3, 0],
    show: true,
    opacity: 0.6,
    server: 'https://geotrellis.io/gt/weighted-overlay/wms',
    palette: chroma.scale(['#A65034', '#E3D3C2', '#D0DBE1', '#5891C1']).mode('lab').domain([0, 0.5, 0.6, 1]).colors(10)
  }]
};
