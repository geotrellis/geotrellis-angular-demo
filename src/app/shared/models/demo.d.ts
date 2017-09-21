import { LayerCard } from './layer-card.d';
export interface Demo {
  model: string;
  title: string;
  thumb: string;
  zoom: number;
  center: number[];
  baseLayer: L.TileLayer[];
  groupActions?: {
    diff?: boolean;
    compare?: boolean;
    analyze?: {
      view?: boolean;
      point?: boolean;
      area?: boolean;
    }
  };
  layers: LayerCard[];  
}