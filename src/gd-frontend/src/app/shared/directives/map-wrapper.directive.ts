import { Directive, Input, Output, EventEmitter, OnChanges, OnInit, OnDestroy, SimpleChange, HostBinding } from '@angular/core';

import * as L from 'leaflet';
import 'leaflet-draw';

import { LeafletDirective, LeafletDirectiveWrapper } from '@asymmetrik/ngx-leaflet';

@Directive({
  selector: '[gdMapWrapper]'
})
export class MapWrapperDirective implements OnInit, OnChanges, OnDestroy {
  @Input() hasMask: boolean;
  @Output() hasMaskChange = new EventEmitter<boolean>();
  mapWrapper: LeafletDirectiveWrapper;

  drawControl: L.Control.Draw;
  zoomControl: L.Control.Zoom;
  // store the last drawn item or viewport
  layer: L.Layer;

  map: L.Map;
  drawOptions: L.Control.DrawConstructorOptions = {
    position: 'topright',
    edit: {
      featureGroup: new L.FeatureGroup(),
      remove: false,
      edit: false
    },
    draw: <L.Control.DrawOptions>{
      marker: false,
      rectangle: false,
      circle: false,
      circlemarker: false,
      polyline: false,
      polygon: false
    }
  };
  @Input() isCollapsed: boolean;

  @Input() mask: any;
  @Output() maskChange = new EventEmitter<string | { lat: number, lng: number }>();
  @Output() polygonCreated = new EventEmitter<boolean>();

  @Input() view: L.Polygon;

  constructor(
    private _ld: LeafletDirective
  ) {
    this.mapWrapper = new LeafletDirectiveWrapper(this._ld);
  }

  ngOnInit() {
    this.map = this.mapWrapper.getMap();
    // initialize the feature group
    this.map.addLayer(this.drawOptions.edit.featureGroup);

    this.zoomControl = new L.Control.Zoom({
      position: 'topright'
    });
    this.map.addControl(this.zoomControl);

    // Create the control
    this.drawControl = new L.Control.Draw(this.drawOptions);
    // Add the control to the map
    this.map.addControl(this.drawControl);

    this.map.on(L.Draw.Event.CREATED, (e: any) => {
      const newLayer: L.Layer = (e as L.DrawEvents.Created).layer;
      let maskGeojson;
      if (e.layerType === 'circlemarker') {
        maskGeojson = newLayer['_latlng'];
      } else {
        // POLYLINE, must not be polygon, or the first coords and the last one will not be correct
        maskGeojson = L.polyline(newLayer['_latlngs']).toGeoJSON();
        Object.assign(maskGeojson, {
          geometry: {
            type: 'Polygon',
            coordinates: (maskGeojson.geometry.coordinates as number[][][]).map(el => el.map(item => item.reverse()))
          }
        });
        maskGeojson = JSON.stringify(maskGeojson);
      }
      this.maskChange.emit(maskGeojson);
      this.hasMaskChange.emit(true);

      const bool = this.drawOptions.edit.featureGroup.hasLayer(this.layer);
      if (bool) {
        this.drawOptions.edit.featureGroup.removeLayer(this.layer);
      }
      this.layer = newLayer;
      this.drawOptions.edit.featureGroup.addLayer(newLayer);
    });
  }

  ngOnDestroy() {
    this.map.removeControl(this.drawControl);
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes.view && changes.view.currentValue !== undefined) {
      this.layer = changes.view.currentValue;
      this.drawOptions.edit.featureGroup.addLayer(changes.view.currentValue);
    }
    if (changes.isCollapsed && !changes.isCollapsed.firstChange && changes.isCollapsed.currentValue !== changes.isCollapsed.previousValue) {
      setTimeout(() => {
        this.map.invalidateSize({
          animate: true,
          duration: 0.1,
          easeLinearity: 0.25
        });
      }, 10);
    }
  }
}
