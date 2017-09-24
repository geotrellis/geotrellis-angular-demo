export interface LayerCard {
  info: {
    name: string;
    title: string;
    presets?: {
      text: string;
      value: string[] | number[];
    }[];
    layerActions: {
      info?: {
        infoText: string;
        palettes?: string[];
      };
      params?: {
        paramsText: string[];
        quant?: number;// range
        qual?: any;// number(quantitative) or string(qualitive)
      };
      opacity?: boolean;
    };
    modelActions?: {
      summary?: boolean;
    }
  };
  values?: number[] | string[];
  show: boolean;
  opacity?: number;
  mask?: any;
  params?: any;
  server: string;
  palette?: string[] | string;
  summary?: {
    layers: number[];
    total: number
  };
  expanded: string;
}