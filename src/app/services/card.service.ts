import { Injectable } from '@angular/core';
import { LayerCard } from '../layer-card.d';
import { LAYERCARDS } from '../layer-cards';

@Injectable()
export class CardService {
  // keep for now
  getModel(): Promise<LayerCard[]> {
    return Promise.resolve(LAYERCARDS);
  }

  getCards(name: string): Promise<LayerCard[]> {
    return this.getModel()
               .then(cards => cards.filter(card => card.model === name));
  }
  constructor() { }

}
