import { Component, HostBinding, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { LayerCard } from '../../layer-card.d';


@Component({
  selector: 'gd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @HostBinding('class.dashboard') true;
  cards: LayerCard[] = [];

  constructor(
    private cardService: CardService
  ) { }

    ngOnInit(): void {
      this.cardService.getLayerCards()
        .then(cards => this.cards = cards);
    }
  }
