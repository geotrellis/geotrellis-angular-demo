import 'rxjs/add/operator/switchMap';

import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { LayerCard } from '../../layer-card.d';
import { CardService } from '../../services/card.service';

import * as L from 'leaflet';

@Component({
    selector: 'gd-map-view',
    templateUrl: './map-view.component.html'
})
export class MapViewComponent implements OnInit {
    @HostBinding('class.map-view') true;
    hasMask = false;
    map: L.Map;
    cards: LayerCard[] = [];
    mask = '';
    options = {
        layers: [
            L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
                subdomains: 'abcd',
                maxZoom: 19
            })
        ],
        zoom: undefined,
        center: undefined,
        zoomControl: false
    };

    deleteDraw(): void {
        this.map.eachLayer(el => {
            if (el.hasOwnProperty('editing')) {
                this.map.removeLayer(el);
            }
        });
        this.mask = '';
        this.hasMask = false;
    }

    constructor(
        private cardService: CardService,
        private route: ActivatedRoute,
    ) {
        this.route.paramMap
        .switchMap((params: ParamMap) => this.cardService.getLayerCard(params.get('name')))
        .subscribe(card => {
            this.cards = card;
            this.options = Object.assign({}, this.options, {
                zoom: card[0].info.zoom,
                center: card[0].info.center
            });
        });
    }

    ngOnInit(): void {

      }
}
