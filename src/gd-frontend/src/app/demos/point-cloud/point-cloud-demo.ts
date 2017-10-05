import * as chroma from 'chroma-js';
import * as L from 'leaflet';

export const POINTCLOUDDEMO: GD.Demo = {
  // poing cloud
  model: 'point-cloud',
  title: 'Point Cloud',
  thumb: 'assets/img/pc-thumb.png',
  zoom: 12,
  center: [35.866144, -106.575149],
  baseLayer: [
    L.tileLayer('http://tile.stamen.com/terrain-background/{z}/{x}/{y}@2x.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'jpg',
      opacity: 0.6,
    }),
    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}@2x.{ext}', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png',
      opacity: 0.4,
    })
  ],
  groupActions: {
    analyze: {
      view: true,
      point: true,
      area: true,
    }
  },
  layers: [{
    info: {
      name: 'creation-render',
      title: 'DEM Creation Method & Render Options',
      presets: [{
        text: 'TIN, Hillshade, Snow On',
        value: ['tin', 'hillshade', 'mar10']
      }, {
        text: 'IDW, Hillshade, Snow On',
        value: ['idw', 'hillshade', 'mar10']
      }, {
        text: 'TIN, Color Ramp, Snow Off',
        value: ['tin', 'png', 'jul10']
      }, {
        text: 'Custom',
        value: undefined
      }],
      layerActions: {
        info: {
          infoText: `The application demonstrates working with DEMs derived from LiDAR. LiDAR was flown over this area during times when snowpack was present (in winter) and when snowpack was not present (summer). We converted the point cloud data into DEMs using both Inverse Distance Weighted (IDW) and Triangulated Irregular Network (TIN) methods.

            Use this demo to explore differences in the DEM methods, on the fly visualizations, and analytics of the difference layer that can indicate locations of snowpack.`,
        },
        params: {
          qual: {
            'DEM Creation Method': {
              'TIN': 'tin',
              'IDW': 'idw'
            },
            'Render Options': {
              'Hillshade': 'hillshade',
              'Color Ramp': 'png'
            },
            'Dataset': {
              'Snow On': 'snow-on',
              'Snow Off': 'snow-off',
            }
          }
        },
        opacity: true,
      },
      modelActions: {
        summary: true,
      }
    },
    params: {
      colorRamp: 'blue-to-red'
    },
    values: ['tin', 'hillshade', 'mar10'],
    show: true,
    opacity: 0.6,
    server: `http://ec2-54-87-204-186.compute-1.amazonaws.com/tms/{values[1]}/{values[2]}{values[0]}/{z}/{x}/{y}?colorRamp=blue-to-red`,
    mask: undefined,
    summary: undefined,
    expanded: undefined
  }, {
    info: {
      name: 'change-detection',
      title: 'Change Detection',
      layerActions: {
        info: {
          infoText: 'Comparison between snow-on and snow-off datasets.',
        },
        opacity: true,
      },
      modelActions: {
        summary: true,
      }
    },
    show: false,
    opacity: 0.6,
    server: 'http://ec2-54-87-204-186.compute-1.amazonaws.com/tms/diff-tms/png/mar10idw/jul10idw/{z}/{x}/{y}',
    mask: undefined,
    summary: undefined,
    expanded: undefined
  }],
};
