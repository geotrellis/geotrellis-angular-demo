import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';
@Component({
    selector: 'gd-map-view',
    templateUrl: './map-view.component.html'
})
export class MapViewComponent {
    map: L.Map;
    mask: string;
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
    }
    constructor( ) { }

}
