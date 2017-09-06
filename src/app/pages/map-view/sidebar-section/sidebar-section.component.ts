import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, OnChanges, Output, Renderer2, ViewChild } from '@angular/core';

import { LayerService } from '../../../services/layer.service';
import * as L from 'leaflet';
import 'leaflet-draw';

import { LayerCard } from '../../../layer-card';

@Component({
    selector: 'gd-sidebar-section',
    templateUrl: './sidebar-section.component.html',
    providers: [LayerService]
})
export class SidebarSectionComponent implements OnInit, OnChanges {
    @Input() map: L.Map;
    @Input() cards: LayerCard[];
    @Input() mask = '';
    view: L.Rectangle;
    isSingle: boolean;
    @Output() maskChange = new EventEmitter<string>();
    @Output() onSummaryChange = new EventEmitter<object>();
    @Output() hasMaskChange = new EventEmitter<boolean>();

    isCollapsed = false;
    expanded: string;

    layersMap: Map<string, L.Layer> = new Map();

    layers: L.Layer[] = [];

    getView(): void {
        this.map.eachLayer(el => {
            if (el.hasOwnProperty('editing')) {
                this.map.removeLayer(el);
            }
        });
        const bounds = L.rectangle(this.map.getBounds()).toGeoJSON();
        const coords = (bounds.geometry.coordinates[0].slice(1) as number[][]).map(el => {
            return el.reverse();
        });
        // 'draw' the area as the other button do;
        this.view = L.rectangle(this.map.getBounds());
        // L.rectangle(this.map.getBounds()).addTo(this.map);
        const view = JSON.stringify(Object.assign(bounds, {
            geometry: {
                type: 'Polygon',
                coordinates: [coords]
            }
        }));
        this.maskChange.emit(view);
        this.hasMaskChange.emit(true);
        this.cards.forEach((el, i) => {
            if (el.hasOwnProperty('mask')) {
                el.mask = view;
                this._layerService.getBreaks(el.info.name, el.values).subscribe(res => {
                    const wms = L.tileLayer.wms(el.server, {
                        breaks: res,
                        layers: el.params,
                        format: 'image/png',
                        weights: el.values,
                        colorRamp: el.palette ? el.palette : '',
                        mask: view,
                        transparent: true,
                        attribution: 'Azavea',
                        uppercase: el.info.name === 'lm' ? true : false,
                        opacity: 1,
                        pane: el.info.name
                    });
                    this.map.addLayer(wms);
                    this.layersMap.set(el.info.name, wms);
                    if (i === this.cards.length - 1) {
                        this.layers = Array.from(this.layersMap.values());
                    }
                    this.onOpacityChange(el.info.name, el.opacity);
                }, console.error);
                if (el.hasOwnProperty('summary')) {
                    this._layerService.getSummary(el.info.name, el.values, el.mask).subscribe(res => {
                        el.summary = res;
                    }, console.error);
                }

            }
        });
    }
    startDraw(): void {
        const polygon_options = {
            showArea: false,
            shapeOptions: {
                stroke: true,
                color: '#6e83f0',
                weight: 4,
                opacity: 0.5,
                fill: true,
                fillColor: null,
                fillOpacity: 0.2,
                clickable: true
            }
        };
        // added a few lines in leaflet-draw.d.ts;
        const polygonDrawer = new L.Draw.Polygon(this.map, polygon_options);
        (polygonDrawer as L.Handler).enable();
    }

    onOpacityChange(name: string, opacity: number): void {
        const card = this.filterByName(name, this.cards);
        this._rd.setStyle(this.map.getPane(name), 'opacity', card.opacity);
    }

    onShowChange(name: string, show: boolean): void {
        const visible = show ? 'visible' : 'hidden';
        this._rd.setStyle(this.map.getPane(name), 'visibility', visible);
    }

    filterByName(name: string, arr: LayerCard[]): LayerCard {
        return arr.filter(el => {
            if (el.info.name === name) {
                return true;
            }
        })[0];
    }
    onPaletteChange(name: string, palette: string): void {
        const card = this.filterByName(name, this.cards);
        this._layerService.getBreaks(card.info.name, card.values).subscribe(res => {
            const wms = L.tileLayer.wms(card.server, {
                breaks: res,
                layers: card.params,
                format: 'image/png',
                weights: card.values,
                transparent: true,
                colorRamp: palette,
                mask: card.mask ? card.mask : '',
                attribution: 'Azavea',
                uppercase: card.info.name === 'lm' ? true : false,
                opacity: 1,
                pane: name
            });
            this.layersMap.set(card.info.name, wms);
            this.layers = Array.from(this.layersMap.values());

        }, console.error);
        this.onOpacityChange(name, card.opacity);
    }
    onValuesChange(name: string, layer: L.Layer): void {
        const card = this.filterByName(name, this.cards);
        this._layerService.getBreaks(card.info.name, card.values).subscribe(res => {
            const wms = L.tileLayer.wms(card.server, {
                breaks: res,
                layers: card.params,
                format: 'image/png',
                weights: card.values,
                transparent: true,
                colorRamp: card.palette ? card.palette : '',
                mask: card.mask ? card.mask : '',
                attribution: 'Azavea',
                uppercase: card.info.name === 'lm' ? true : false,
                opacity: 1,
                pane: name
            });
            this.layersMap.set(card.info.name, wms);
            this.layers = Array.from(this.layersMap.values());

        }, console.error);
        this.onOpacityChange(name, card.opacity);
        if (card.hasOwnProperty('mask') && card.mask !== '') {
            this._layerService.getSummary(card.info.name, card.values, card.mask).subscribe(res => {
                card.summary = res;
            }, console.error);
        }
    }

    constructor(
        private _el: ElementRef,
        private _rd: Renderer2,
        private _layerService: LayerService,
    ) {
    }
    ngOnInit() {
        this.isSingle = (this.cards && this.cards.length === 1) ? true : false;
        // for debugging
        // console.log(this.cards, 'init');
       
    }

    ngOnChanges(changes) {
        if (changes.map && changes.map.currentValue !== undefined) {
            const layer = L.tileLayer('http://ec2-54-87-204-186.compute-1.amazonaws.com/tms/diff-tms/png/mar10idw/jul10idw/{z}/{x}/{y}');
            layer.addTo(this.map);
            console.log('added');
            this.cards.forEach(el => {
                this.map.createPane(el.info.name);
                this._layerService.getBreaks(el.info.name, el.values).subscribe(res => {
                    const wms = L.tileLayer.wms(el.server, {
                        breaks: res,
                        layers: el.params,
                        format: 'image/png',
                        weights: el.values,
                        colorRamp: el.palette ? el.palette : '',
                        mask: el.mask ? el.mask : '',
                        transparent: true,
                        attribution: 'Azavea',
                        uppercase: el.info.name === 'lm' ? true : false,
                        opacity: 1,
                        pane: el.info.name
                    });
                    this.layersMap.set(el.info.name, wms);
                    this.layers.push(wms);
                    this.onOpacityChange(el.info.name, el.opacity);

                }, console.error);
            });
        }

        if (changes.mask && changes.mask.currentValue.length > 0) {
            const card = this.filterByName(name, this.cards);
            this.cards.forEach((el, i) => {
                if (el.hasOwnProperty('mask')) {
                    el.mask = changes.mask.currentValue;
                    this._layerService.getBreaks(el.info.name, el.values).subscribe(res => {
                        const wms = L.tileLayer.wms(el.server, {
                            breaks: res,
                            layers: el.params,
                            format: 'image/png',
                            weights: el.values,
                            colorRamp: el.palette ? el.palette : '',
                            mask: el.mask,
                            transparent: true,
                            attribution: 'Azavea',
                            uppercase: el.info.name === 'lm' ? true : false,
                            opacity: 1,
                            pane: el.info.name
                        });
                        this.map.addLayer(wms);
                        this.layersMap.set(el.info.name, wms);
                        if (i === this.cards.length - 1) {
                            this.layers = Array.from(this.layersMap.values());
                        }
                        this.onOpacityChange(el.info.name, el.opacity);
                    }, console.error);
                    if (el.hasOwnProperty('summary')) {
                        this._layerService.getSummary(el.info.name, el.values, el.mask).subscribe(res => {
                            el.summary = res;
                        }, console.error);
                    }
                }
            });
        }
        if (changes.mask && changes.mask.currentValue.length === 0) {
            const card = this.filterByName(name, this.cards);
            this.cards.forEach((el, i) => {
                if (el.hasOwnProperty('mask')) {
                    el.mask = changes.mask.currentValue;
                    this._layerService.getBreaks(el.info.name, el.values).subscribe(res => {
                        const wms = L.tileLayer.wms(el.server, {
                            breaks: res,
                            layers: el.params,
                            format: 'image/png',
                            weights: el.values,
                            colorRamp: el.palette ? el.palette : '',
                            mask: '',
                            transparent: true,
                            attribution: 'Azavea',
                            uppercase: el.info.name === 'lm' ? true : false,
                            opacity: 1,
                            pane: el.info.name
                        });
                        this.map.addLayer(wms);
                        this.layersMap.set(el.info.name, wms);
                        if (i === this.cards.length - 1) {
                            this.layers = Array.from(this.layersMap.values());
                        }
                        this.onOpacityChange(el.info.name, el.opacity);
                    }, console.error);
                }
            });
        }
    }
}
