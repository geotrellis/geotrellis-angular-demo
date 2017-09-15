import { Injectable } from '@angular/core';
import { LayerCard } from '../models/layer-card.d';
import { LAYERCARDS } from '../models/layer-cards';

@Injectable()
export class CardService {
  getModel(): Promise<LayerCard[]> {
    return Promise.resolve(LAYERCARDS);
  }

  getCards(name: string): Promise<LayerCard[]> {
    return this.getModel()
               .then(cards => cards.filter(card => card.model === name));
  }
}
