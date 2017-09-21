import * as chroma from 'chroma-js';
import * as L from 'leaflet';

import { Demo } from '../../shared/models/demo.d';
export const POTSDAMDEMO: Demo = {
  model: 'potsdam',
  title: 'Potsdam',
  thumb: 'https://potsdam.geotrellis.io/tms/hillshade/isprs-potsdam-dsm/18/140577/86109',
  zoom: 14,
  center: [52.403269, 13.052745],
  baseLayer: [L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 19
  })],
  layers: [{
    info: {
      name: 'potsdam-imagery',
      title: 'Imagery',
      actions: ['info', 'opacity'],
      infotext: `Explore the results of the Raster Vision work on the ISPRS Postdam challenge with this application.

            We generated multiple layers of results using Fully Convolutional Network (FCN) and U-Net architectures. With this application you can view the results of our models compared to ground truth, as well as discover areas where the architectures do better or worse than one another.`,
      presets: [{
        text: 'RGB',
        value: ['rgb', 'rgb']
      }, {
        text: 'IRRG',
        value: ['rgb', 'irrg']
      }, {
        text: 'NDVI',
        value: ['ndvi', 'rir']
      }, {
        text: 'Grayscale',
        value: ['grayscale', 'rgb']
      }]
    },
    values: ['rgb', 'rgb'],
    show: true,
    opacity: 0.9,
    server: 'https://potsdam.geotrellis.io/tms/imagery/{values[0]}/isprs-potsdam-imagery-{values[1]}/{z}/{x}/{y}',
    expanded: undefined
  }, {
    info: {
      name: 'potsdam-dsm-gtn',
      title: 'Digital Surface Model (GeoTrellis generated)',
      actions: ['info', 'opacity'],
      infotext: 'Digital surface model generated by GeoTrellis ingest of LiDAR data.',
      presets: [{
        text: 'Hillshade',
        value: ['hillshade']
      }, {
        text: 'Ramp',
        value: ['png']
      }]
    },
    values: ['hillshade'],
    show: false,
    opacity: 0.6,
    server: 'https://potsdam.geotrellis.io/tms/{values[0]}/isprs-potsdam-dsm-gtn/{z}/{x}/{y}',
    expanded: undefined

  }, {
    info: {
      name: 'potsdam-labels',
      title: 'Ground Truth Labels',
      actions: ['info', 'opacity'],
      infotext: 'Ground truth labels provided by ISRPS for training.'
    },
    show: false,
    opacity: 0.6,
    server: 'https://potsdam.geotrellis.io/tms/labels/isprs-potsdam-labels/{z}/{x}/{y}',
    expanded: undefined
  }, {
    info: {
      name: 'potsdam-unet-predictions',
      title: 'U-NET Predictions',
      actions: ['info', 'opacity'],
      infotext: 'Predicted labels by an ensemble of U-Net models over the cross-validation training set.',
      presets: [{
        text: 'All',
        value: ['', '']
      }, {
        text: 'Wrong',
        value: ['-incorrect', '/isprs-potsdam-labels']
      }]
    },
    values: ['', ''],
    show: false,
    opacity: 0.6,
    server: 'https://potsdam.geotrellis.io/tms/models/prediction{values[0]}/isprs-potsdam-unet-predictions{values[1]}/{z}/{x}/{y}',
    expanded: undefined
  }, {
    info: {
      name: 'potsdam-unet-probabilities',
      title: 'U-NET Probabilities',
      actions: ['info', 'opacity'],
      infotext: 'Probability output for each label class by the U-Net ensemble.',
      presets: [{
        text: 'Impervious Surfaces',
        value: ['0']
      }, {
        text: 'Building',
        value: ['1']
      }, {
        text: 'Low Vegetation',
        value: ['2']
      }, {
        text: 'Trees',
        value: ['3']
      }, {
        text: 'Cars',
        value: ['4']
      }, {
        text: 'Clutter',
        value: ['5']
      }]
    },
    values: ['0'],
    show: false,
    opacity: 0.6,
    server: 'https://potsdam.geotrellis.io/tms/models/probability/isprs-potsdam-unet-probabilities/{values[0]}/{z}/{x}/{y}',
    expanded: undefined
  }, {
    info: {
      name: 'potsdam-fcn-predictions',
      title: 'FCN Predictions',
      actions: ['info', 'opacity'],
      infotext: 'Predicted labels by the FCN ensemble.',
      presets: [{
        text: 'All',
        value: ['', '']
      }, {
        text: 'Wrong',
        value: ['-incorrect', '/isprs-potsdam-labels']
      }]
    },
    values: ['', ''],
    show: false,
    opacity: 0.6,
    server: 'https://potsdam.geotrellis.io/tms/models/prediction{values[0]}/isprs-potsdam-fcn-predictions{values[1]}/{z}/{x}/{y}',
    expanded: undefined
  }, {
    info: {
      name: 'potsdam-fcn-probabilities',
      title: 'FCN Probabilities',
      actions: ['info', 'opacity'],
      infotext: 'Probability output for each label class by the FCN ensemble.',
      presets: [{
        text: 'Impervious Surfaces',
        value: ['0']
      }, {
        text: 'Building',
        value: ['1']
      }, {
        text: 'Low Vegetation',
        value: ['2']
      }, {
        text: 'Trees',
        value: ['3']
      }, {
        text: 'Cars',
        value: ['4']
      }, {
        text: 'Clutter',
        value: ['5']
      }]
    },
    values: ['0'],
    show: false,
    opacity: 0.6,
    server: 'https://potsdam.geotrellis.io/tms/models/probability/isprs-potsdam-fcn-probabilities/{values[0]}/{z}/{x}/{y}',
    expanded: undefined
  }, {
    info: {
      name: 'potsdam-fcndsm-predictions',
      title: 'FCN+DSM Predictions',
      actions: ['info', 'opacity'],
      infotext: 'Predicted labels by an ensemble of FCN+DSM models over the cross-validation training set.',
      presets: [{
        text: 'All',
        value: ['', '']
      }, {
        text: 'Wrong',
        value: ['-incorrect', '/isprs-potsdam-labels']
      }]
    },
    values: ['', ''],
    show: false,
    opacity: 0.6,
    server: 'https://potsdam.geotrellis.io/tms/models/prediction{values[0]}/isprs-potsdam-fcndsm-predictions{values[1]}/{z}/{x}/{y}',
    expanded: undefined
  }, {
    info: {
      name: 'potsdam-fcndsm-probabilities',
      title: 'FCN+DSM Probabilities',
      actions: ['info', 'opacity'],
      infotext: 'Probability output for each label class by the FCN+DSM ensemble.',
      presets: [{
        text: 'Impervious Surfaces',
        value: ['0']
      }, {
        text: 'Building',
        value: ['1']
      }, {
        text: 'Low Vegetation',
        value: ['2']
      }, {
        text: 'Trees',
        value: ['3']
      }, {
        text: 'Cars',
        value: ['4']
      }, {
        text: 'Clutter',
        value: ['5']
      }]
    },
    values: ['0'],
    show: false,
    opacity: 0.6,
    server: 'https://potsdam.geotrellis.io/tms/models/probability/isprs-potsdam-fcndsm-probabilities/{values[0]}/{z}/{x}/{y}',
    expanded: undefined
  }, {
    info: {
      name: 'potsdam-fcn-unet',
      title: 'FCN vs U-NET',
      actions: ['info', 'opacity'],
      infotext: 'Comparison of FCN vs U-Net predictions. Shows colors for what FCN got right and U-Net got wrong, what U-Net got right and FCN got wrong, and what pixels both enbembles got wrong.'
    },
    show: false,
    opacity: 0.6,
    server: 'https://potsdam.geotrellis.io/tms/models/prediction-ab/isprs-potsdam-fcn-predictions/isprs-potsdam-unet-predictions/isprs-potsdam-labels/{z}/{x}/{y}',
    expanded: undefined
  }, {
    info: {
      name: 'potsdam-fcn-fcndsm',
      title: 'FCN vs FCN w/ DSM',
      actions: ['info', 'opacity'],
      infotext: 'Comparison of FCN vs FCN+DSM predictions. Shows colors for what FCN got right and U-Net got wrong, what U-Net got right and FCN got wrong, and what pixels both enbembles got wrong.'
    },
    show: false,
    opacity: 0.6,
    server: 'https://potsdam.geotrellis.io/tms/models/prediction-ab/isprs-potsdam-fcn-predictions/isprs-potsdam-fcndsm-predictions/isprs-potsdam-labels/{z}/{x}/{y}',
    expanded: undefined
  }]

};