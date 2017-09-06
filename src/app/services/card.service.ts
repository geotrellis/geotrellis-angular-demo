import { Injectable } from '@angular/core';
import { LayerCard } from '../layer-card.d';
import { LAYERCARDS } from '../layer-cards';

@Injectable()
export class CardService {
  getModel(): Promise<LayerCard[]> {
    return Promise.resolve(LAYERCARDS);
  }

  getLayerCard(name: string): Promise<LayerCard[]> {
    return this.getModel()
               .then(cards => cards.filter(card => card.info.name === name));
  }
  constructor() { }

}
