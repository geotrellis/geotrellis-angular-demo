import * as chroma from 'chroma-js';
import * as L from 'leaflet';

import { Demo } from '../../shared/models/demo.d';
export const CHATTADEMO: Demo = {
  model: 'chatta',
  title: 'Chattanooga Agriculture & Forestry Value Model',
  thumb: 'https://geotrellis.io/img/demo_02.jpg',
  zoom: 8.4,
  center: [34.76192255039478, -85.35140991210938],
  baseLayer: [L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 19
  })],
  layers: [{
    info: {
      name: 'chatta',
      title: 'Chattanooga Agriculture & Forestry Value Model',
      presets: [
        {
          value: [-5, -4, -2, 1, -1, 2, 4, 3, 5],
          text: 'Preset1'
        }, {
          value: [-5, 4, -2, 1, 1, 2, 4, 3, 5],
          text: 'Preset2'
        }, {
          value: undefined,
          text: 'Custom'
        }
      ],
      actions: ['info', 'weight', 'opacity'],
      optional: ['summary'],
      infotext: `This project is a joint effort of the University of Tennessee at Chattanooga and Azavea, with funding from the Lyndhurst Foundation.`,
      prtext: [
        'Impervious_Surfaces_Barren_Lands_Open_Water',
        'Developed_Land',
        'Wetlands',
        'Forested_Lands',
        'Non-working_Protected_Or_Public_Lands',
        'Publically_Owned_Working_Lands',
        'Privately_Owned_Working_Lands_With_Easements',
        'Farmland_Without_Prime_Agricultural_Soils',
        'Farmland_Or_Forested_Lands_With_Prime_Agricultural_Soils'
      ],
      range: 6,
      palettes: [
        'yellow-to-red-heatmap',
        'blue-to-yellow-to-red-heatmap',
        'dark-red-to-yellow-heatmap',
        'blue-to-red',
        'green-to-red-orange',
        'muted-terrain-qualitative',
        'green-to-orange',
        'light-to-dark-green',
        'light-to-dark-sunset',
        'purple-to-dark-purple-to-white-heatmap',
        'blue-to-orange',
        'bold-land-use-qualitative'
      ],
    },
    params: {
      layers: 'ImperviousSurfaces_Barren Lands_Open Water,DevelopedLand,Wetlands,ForestedLands,Non-workingProtectedOrPublicLands,PublicallyOwnedWorkingLands,PrivatelyOwnedWorkingLandsWithEasements,FarmlandWithoutPrimeAgriculturalSoils,FarmlandOrForestedLandsWithPrimeAgriculturalSoils'
    },
    values: [-5, -4, -2, 1, -1, 2, 4, 3, 5],
    show: true,
    opacity: 0.6,
    server: 'http://demo.geotrellis.com/chatta/gt/wo',
    mask: undefined,
    palette: 'yellow-to-red-heatmap',
    summary: undefined,
    expanded: undefined
  }]
};
