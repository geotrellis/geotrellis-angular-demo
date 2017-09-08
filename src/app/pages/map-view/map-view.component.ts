import 'rxjs/add/operator/switchMap';

import { Component, ChangeDetectorRef, HostBinding, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { LayerCard } from '../../layer-card.d';
import { CardService } from '../../services/card.service';

import * as L from 'leaflet';

@Component({
    selector: 'gd-map-view',
    templateUrl: './map-view.component.html'
})
export class MapViewComponent implements OnInit, AfterViewInit {
    @HostBinding('class.map-view') true;
    hasMask = false;
    map: L.Map;
    cards: LayerCard[] = [];
    mask: any;
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

    resetArea(): void {
        this.map.eachLayer(el => {
            if (el.hasOwnProperty('editing')) {
                this.map.removeLayer(el);
            }
        });
        this.mask = undefined;
        // when reset area should clean the previous summary data;
        this.cards.forEach(el => {
            if (el.hasOwnProperty('summary')) {
                el.summary = undefined;
            }
        });
        console.log(this.cards)
        this.hasMask = false;
    }

    constructor(
        private cardService: CardService,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef,
    ) {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.cardService.getCards(params.get('name')))
            .subscribe(cards => {
                console.log(cards, 'cards')
                this.cards = cards;
                this.options = Object.assign({}, this.options, {
                    zoom: cards[0].info.zoom,
                    center: cards[0].info.center
                });
            });
    }

    ngOnInit(): void {


    }

    ngAfterViewInit() {
        this.cd.detectChanges();
    }
}
