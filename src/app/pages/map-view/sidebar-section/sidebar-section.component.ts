import { Component, ContentChild, EventEmitter, Input, OnInit, OnChanges, Output, ViewChild } from '@angular/core';

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
    @Input() mask: any;
    view: L.Rectangle;
    isSingle: boolean;
    isLoading: boolean;
    @Output() maskChange = new EventEmitter<string>();
    @Output() hasMaskChange = new EventEmitter<boolean>();

    isCollapsed = false;
    expanded: string;

    layersMap: Map<string, L.Layer> = new Map();
    layers: L.Layer[] = [];

    // when group action panel is opened, all card layer's panels should be closed
    onExpandedChange() {
        this.cards.forEach(el => {
            el.expanded = undefined;
        });
    }
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
                this._layerService.getLayer(el).subscribe(res => {
                    this.layersMap.set(el.info.name, res);
                    this.layers = Array.from(this.layersMap.values());
                    this.onOpacityChange(el.info.name, el.opacity);
                });
                if (el.hasOwnProperty('summary')) {
                    this.isLoading = true;
                    const zoom = this.map.getZoom();
                    let values = el.values;
                    if (el.info.name === 'change-detection') {
                        values = this.cards.filter(pt => pt.info.name === 'creation-render')[0].values;
                    }
                    this._layerService.getSummary(el, values, zoom).subscribe(res => {
                        el.summary = res;
                        el.expanded = 'summary';
                        this.isLoading = false;
                    }, console.error);
                }
            }
        });
    }
    startDraw(type: string): void {
        // const polygon_options = {
        //     showArea: false,
        //     // shapeOptions: {
        //     //     stroke: true,
        //     //     color: '#6e83f0',
        //     //     weight: 4,
        //     //     opacity: 0.5,
        //     //     fill: true,
        //     //     fillColor: null,
        //     //     fillOpacity: 0.2,
        //     //     clickable: true
        //     // }
        // };
                // added a few lines in leaflet-draw.d.ts;
                const polygonDrawer = new L.Draw.Polygon(this.map);
                
                            const pointDrawer = new L.Draw.CircleMarker(this.map);
                
        if (type === 'poly') {
            (pointDrawer as L.Handler).disable();
            (polygonDrawer as L.Handler).enable();
            
        } else {
            (polygonDrawer as L.Handler).disable();
            (pointDrawer as L.Handler).enable();
            
            
        }
    }

    onOpacityChange(name: string, opacity: number): void {
        const el = this.filterByName(name);
        const lyr = this.layersMap.get(name);
        (lyr as L.TileLayer).setOpacity(el.opacity);
        this.layersMap.set(name, lyr);
        this.layers = Array.from(this.layersMap.values());
    }

    onShowChange(name: string, show: boolean): void {
        const visible = show ? 'visible' : 'hidden';
        const lyr = this.layersMap.get(name);
        const el = this.filterByName(name);
        if (show) {
            this._layerService.getLayer(el).subscribe(res => {
                (res as L.TileLayer).setOpacity(el.opacity);
                this.layersMap.set(name, res);
                this.layers = Array.from(this.layersMap.values());
            });
        } else {
            this.layersMap.delete(name);
            this.layers = Array.from(this.layersMap.values());
        }
        // all card panels should be closed;
        el.expanded = undefined;
    }

    filterByName(name: string): LayerCard {
        return this.cards.filter(el => {
            if (el.info.name === name) {
                return true;
            }
        })[0];
    }
    onPaletteChange(name: string, palette: string): void {
        const el = this.filterByName(name);
        this._layerService.getLayer(el).subscribe(res => {
            res.setOpacity(el.opacity);
            this.layersMap.set(el.info.name, res);
            this.layers = Array.from(this.layersMap.values());
        });
    }

    onValuesChange(name: string, layer: L.Layer): void {
        const el = this.filterByName(name);
        this._layerService.getLayer(el).subscribe(res => {
            res.setOpacity(el.opacity);
            this.layersMap.set(el.info.name, res);
            this.layers = Array.from(this.layersMap.values());
        });
        if (el.hasOwnProperty('mask') && el.mask !== '') {
            this.isLoading = true;
            const zoom = this.map.getZoom();                        
            let values = el.values;
            if (el.info.name === 'change-detection') {
                values = this.cards.filter(pt => pt.info.name === 'creation-render')[0].values;
            }
            this._layerService.getSummary(el, values, zoom).subscribe(res => {
                el.summary = res;
                el.expanded = 'summary';
                this.isLoading = false;
            }, console.error);
        }
    }

    constructor(
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
            const cards = this.cards.filter(el => el.show === true);
            cards.forEach(el => {
                this._layerService.getLayer(el).subscribe(res => {
                    // this.map.addLayer(res);
                    (res as L.TileLayer).setOpacity(el.opacity);
                    this.layersMap.set(el.info.name, res);
                    this.layers = Array.from(this.layersMap.values());
                });
            });
        }

        if (changes.mask && changes.mask.currentValue) {
            this.cards.forEach((el, i) => {
                if (el.hasOwnProperty('mask')) {
                    el.mask = changes.mask.currentValue;
                    this._layerService.getLayer(el).subscribe(res => {
                        res.setOpacity(el.opacity);
                        this.layersMap.set(el.info.name, res);
                        if (i === this.cards.length - 1) {
                            this.layers = Array.from(this.layersMap.values());
                        }
                    });
                    if (changes.mask.currentValue && el.hasOwnProperty('summary')) {
                        this.isLoading = true;
                        const zoom = this.map.getZoom();

                        let values = el.values;
                        if (el.info.name === 'change-detection') {
                            values = this.cards.filter(pt => pt.info.name === 'creation-render')[0].values;
                        }
                        this._layerService.getSummary(el, values, zoom).subscribe(res => {
                            el.summary = res;
                            el.expanded = 'summary';
                            this.isLoading = false;
                        }, console.error);
                    }
                    if (!changes.mask.currentValue) {
                        // close summary panel if is opened;
                        if (el.expanded === 'summary') {
                            el.expanded = undefined;
                        }
                    }
                }
            });
        }
    }
}
