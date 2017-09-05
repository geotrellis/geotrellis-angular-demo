import 'rxjs/add/operator/switchMap';

import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Location } from '@angular/common';

import { LayerCard } from '../../layer-card.d';
import { CardService } from '../../services/card.service';

@Component({
    selector: 'gd-map-view',
    templateUrl: './map-view.component.html'
})
export class MapViewComponent implements OnInit {
    @HostBinding('class.map-view') true;
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
        // zoom: 11,
        zoom: 8.4,
        // center: L.latLng([39.992114502787494, -75.13412475585939])
        center: L.latLng([34.76192255039478, -85.35140991210938]),
        zoomControl: false
    };

    deleteDraw(): void {
        this.map.eachLayer(el => {
            if (el.hasOwnProperty('editing')) {
                this.map.removeLayer(el);
            }
        });
        this.mask = '';
    }

    constructor(
        private cardService: CardService,
        private route: ActivatedRoute,
        private location: Location
    ) {
        this.route.paramMap
        .switchMap((params: ParamMap) => this.cardService.getLayerCard(params.get('name')))
        .subscribe(card => this.cards.push(card));
    }

    ngOnInit(): void {

      }

    goBack(): void {
    this.location.back();
    }

}
