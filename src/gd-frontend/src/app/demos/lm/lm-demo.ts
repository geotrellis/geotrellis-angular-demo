import * as chroma from 'chroma-js';
import * as L from 'leaflet';

export const LMDEMO: GD.Demo = {
  model: 'lm',
  title: 'Philly Location Modeling',
  thumb: 'assets/img/lm-thumb.png',
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
      layerActions: {
        info: {
          infoText: 'This model uses the weighted overlay method, which break the location selection problem into three factors.'
        },
        params: {
          paramsText: ['bars', 'grocery_stores', 'rail_stops'],
          quant: 4
        },
        opacity: true,
      },
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
