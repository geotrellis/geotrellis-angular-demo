import { Injectable } from '@angular/core';
import { LayerCard } from '../layer-card.d';
import { LAYERCARDS } from '../layer-cards';

@Injectable()
export class CardService {
  getLayerCards(): Promise<LayerCard[]> {
    return Promise.resolve(LAYERCARDS);
  }

  getLayerCard(name: string): Promise<LayerCard> {
    return this.getLayerCards()
               .then(heroes => heroes.find(hero => hero.info.name === name));
  }
  constructor() { }

}
