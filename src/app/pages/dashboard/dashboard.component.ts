import { Component, HostBinding, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { LayerCard } from '../../layer-card.d';


@Component({
  selector: 'gd-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  @HostBinding('class.dashboard') true;
  cards: {
    name: string;
    title: string;
    thumb: string;
  }[] = [];

  constructor(
    private cardService: CardService
  ) { }

  ngOnInit(): void {
    this.cardService.getModel().then(cards => {
      const cardsMap = new Map();
      cards.forEach(el => {
        // only get info to be displayed
        if (!cardsMap.has(el.info.name)) {
          cardsMap.set(el.info.name, {
            name: el.info.name,
            title: el.info.title,
            thumb: el.info.thumb
          });
        }
        this.cards = Array.from(cardsMap.values());
      });
    });
  }
}
