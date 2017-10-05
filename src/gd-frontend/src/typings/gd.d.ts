import * as L from 'leaflet';

export as namespace GD;
export interface LayerCard {
  // *one-way binding data
  info: {
    // name for internal use
    name: string;
    // name for display
    title: string;
    // preset configs/models, if any
    presets?: {
      text: string;
      value: string[] | number[];
    }[];
    // layer actions - panels (info, params, opacity, etc...), if any
    layerActions: {
      // info panel
      info?: {
        infoText: string;
        palettes?: string[];
      };
      // params panel
      params?: {
        quant?: {
          text: string[],
          range: number
        };
        qual?: {
          [key: string]: {
            [key: string]: number | string;
          };
        };
      };
      // opacity panel
      opacity?: boolean;
    };
    // model actions - buttons *less common actions, if any
    modelActions?: {
      summary?: boolean;
    }
  };
  // values to be sent in API call
  values?: number[] | string[];
  // layer default visibility (checkbox)
  show: boolean;
  // layer opacity
  opacity?: number;
  // boundary to be sent in API call
  mask?: any;
  // params to be sent in API call
  params?: any;
  server: string;
  // palette selection, if any
  palette?: string[] | string;
  // summary (returned from API call), if any
  summary?: {
    layers: number[];
    total: number
  };
  // default expanded panel
  expanded: string;
}

export interface Demo {
  // name for internal use
  model: string;
  // name for display
  title: string;
  // thumbnail img url
  thumb: string;
  // default map zoom, center, baselayer
  zoom: number;
  center: number[];
  baseLayer: L.TileLayer[];
  // group actions, if any
  groupActions?: {
    diff?: boolean;
    compare?: boolean;
    analyze?: {
      view?: boolean;
      point?: boolean;
      area?: boolean;
    }
  };
  // layers (layer cards)
  layers: LayerCard[];
}