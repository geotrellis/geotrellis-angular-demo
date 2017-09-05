import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, OnChanges, Output, Renderer2, ViewChild } from '@angular/core';
import { LayerService } from '../../../services/layer.service';
import * as chroma from 'chroma-js';
import { LeafletDirective, LeafletDirectiveWrapper } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import 'leaflet-draw';

export interface LayerCard {
    info: {
        name: string;
        title: string;
        presets: [{
            weights: number[],
            text: string,
        }];
        optional?: string[];
        prtext: string[];
        range: number;
        palettes?: string[];
    };
    weights: number[];
    show: boolean;
    opacity: number;
    mask?: string;
    params: string;
    wmsServer: string;
    sumServer?: string;
    palette: string[] | string;
    summary?: {
        layers: number[],
        total: number
    };
}

@Component({
    selector: 'gd-sidebar-section',
    templateUrl: './sidebar-section.component.html',
    providers: [LayerService, LeafletDirective]
})
export class SidebarSectionComponent implements OnChanges {
    @Input() map: L.Map;
    @Input() mask: L.GeoJSON;
    @Output() onSummaryChange = new EventEmitter<object>();

    isCollapsed = false;
    expanded: string;

    colorLM: string[] = ['#A65034', '#E3D3C2', '#D0DBE1', '#5891C1'];
    colorDomain: number[] = [0, 0.5, 0.6, 1];
    colorNumber = 10;
    colorPalette: string[];

    paramsLM: string[] = ['philly_bars', 'philly_grocery_stores', 'philly_rail_stops'];
    paramsCHT = 'ImperviousSurfaces_Barren Lands_Open Water,DevelopedLand,Wetlands,ForestedLands,Non-workingProtectedOrPublicLands,PublicallyOwnedWorkingLands,PrivatelyOwnedWorkingLandsWithEasements,FarmlandWithoutPrimeAgriculturalSoils,FarmlandOrForestedLandsWithPrimeAgriculturalSoils';

    layersMap: Map<string, L.Layer> = new Map();

    layers: L.Layer[] = [];

    lmCard: LayerCard = {
        info: {
            name: 'lm',
            title: 'Philly Location Modeling',
            presets: [
                {
                    weights: [3, -3, 0],
                    text: 'NEAR Bars, BUT NOT Grocery Stores'
                }, {
                    weights: [0, -3, 3],
                    text: 'NEAR Grocery Stores, BUT NOT Bars'
                }, {
                    weights: [0, -3, 3],
                    text: 'NEAR Rail Stops, BUT NOT Grocery Stores'
                }, {
                    weights: [3, 0, 0],
                    text: 'NEAR Bars'
                }],
            prtext: this.paramsLM.map(el => {
                return el.slice(7);
            }),
            range: 4,
        },
        params: this.paramsLM.join(),
        weights: [3, -3, 0],
        show: true,
        opacity: 0.6,
        wmsServer: 'https://geotrellis.io/gt/weighted-overlay/wms',
        palette: chroma.scale(this.colorLM).mode('lab').domain([0, 0.5, 0.6, 1]).colors(10)

    };

    chattaCard: LayerCard = {
        info: {
            name: 'chatta',
            title: 'Chattanooga Agriculture & Forestry Value Model',
            presets: [
                {
                    weights: [-5, -4, -2, 1, -1, 2, 4, 3, 5],
                    text: 'Preset1'
                }, {
                    weights: [-5, 4, -2, 1, 1, 2, 4, 3, 5],
                    text: 'Preset2'
                }
            ],
            optional: ['summary'],
            prtext: [
                'Impervious_Surfaces_Barren_Lands_Open_Water',
                'Developed_Land',
                'Wetlands',
                'Forested_Lands',
                'Non-working_Protected_Or_Public_Lands',
                'Publically_Owned_Working_Lands',
                'Privately_Owned_Working_Lands_With_Easements',
                'Farmland_Without_Prime_Agricultural_Soils',
                'Farmland_Or_Forested_Lands_With_Prime_Agricultural_Soils'
            ],
            range: 6,
            palettes: [
                'yellow-to-red-heatmap',
                'blue-to-yellow-to-red-heatmap',
                'dark-red-to-yellow-heatmap',
                'blue-to-red',
                'green-to-red-orange',
                'muted-terrain-qualitative',
                'green-to-orange',
                'light-to-dark-green',
                'light-to-dark-sunset',
                'purple-to-dark-purple-to-white-heatmap',
                'blue-to-orange',
                'bold-land-use-qualitative'
            ],
        },
        params: this.paramsCHT,
        weights: [-5, -4, -2, 1, -1, 2, 4, 3, 5],
        show: true,
        opacity: 0.6,
        wmsServer: 'http://demo.geotrellis.com/chatta/gt/wo',
        sumServer: 'http://demo.geotrellis.com/chatta/gt/sum',
        mask: '',
        palette: 'yellow-to-red-heatmap',
        summary: null,
    };

    cards: LayerCard[] = [this.lmCard, this.chattaCard];
    mapWrapper: LeafletDirectiveWrapper;

    getView(): void {
        this.map.eachLayer(el => {
            if (el.hasOwnProperty('editing')) {
                this.map.removeLayer(el);
            }
        });
        const bounds = L.rectangle(this.map.getBounds()).toGeoJSON();
        const view = JSON.stringify(Object.assign(bounds, {
            geometry: {
                type: 'Polygon',
                coordinates: (bounds.geometry.coordinates as number[][][]).map(el => el.map(item => item.reverse()))
            }
        }));
        this.cards.forEach((el, i) => {
            if (el.mask !== undefined) {
                el.mask = view;
                this._layerService.getBreaks(el.info.name, el.weights).subscribe(res => {
                    const wms = L.tileLayer.wms(el.wmsServer, {
                        breaks: res,
                        layers: el.params,
                        format: 'image/png',
                        weights: el.weights,
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
                if (el.summary !== undefined) {
                    this._layerService.getSummary(el.info.name, el.weights, el.mask).subscribe(res => {
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
        this._layerService.getBreaks(card.info.name, card.weights).subscribe(res => {
            const wms = L.tileLayer.wms(card.wmsServer, {
                breaks: res,
                layers: card.params,
                format: 'image/png',
                weights: card.weights,
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
    onWeightsChange(name: string, layer: L.Layer): void {
        const card = this.filterByName(name, this.cards);
        this._layerService.getBreaks(card.info.name, card.weights).subscribe(res => {
            const wms = L.tileLayer.wms(card.wmsServer, {
                breaks: res,
                layers: card.params,
                format: 'image/png',
                weights: card.weights,
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
        if (card.mask !== '') {
            this._layerService.getSummary(card.info.name, card.weights, card.mask).subscribe(res => {
                card.summary = res;
            }, console.error);
        }
    }

    constructor(
        private _el: ElementRef,
        private _rd: Renderer2,
        private _layerService: LayerService,
        private ld: LeafletDirective

    ) {
        this.mapWrapper = new LeafletDirectiveWrapper(this.ld);
    }

    ngOnChanges(changes) {
        if (changes.map && changes.map.currentValue !== undefined) {
            this.cards.forEach(el => {
                this.map.createPane(el.info.name);
                this._layerService.getBreaks(el.info.name, el.weights).subscribe(res => {
                    const wms = L.tileLayer.wms(el.wmsServer, {
                        breaks: res,
                        layers: el.params,
                        format: 'image/png',
                        weights: el.weights,
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
        if (changes.mask && changes.mask.currentValue !== undefined) {
            const card = this.filterByName(name, this.cards);
            this.cards.forEach((el, i) => {
                if (el.mask !== undefined) {
                    el.mask = changes.mask.currentValue;
                    this._layerService.getBreaks(el.info.name, el.weights).subscribe(res => {
                        const wms = L.tileLayer.wms(el.wmsServer, {
                            breaks: res,
                            layers: el.params,
                            format: 'image/png',
                            weights: el.weights,
                            colorRamp: el.palette ? el.palette : '',
                            mask: changes.mask.currentValue,
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
                    if (el.summary !== undefined) {
                        this._layerService.getSummary(el.info.name, el.weights, el.mask).subscribe(res => {
                            el.summary = res;
                        }, console.error);
                    }
                }
            });
        }
    }
}
