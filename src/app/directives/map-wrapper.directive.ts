import { Directive, Input, Output, EventEmitter, OnChanges, OnInit, OnDestroy, SimpleChange } from '@angular/core';

import * as L from 'leaflet';
import 'leaflet-draw';

import { LeafletDirective, LeafletDirectiveWrapper } from '@asymmetrik/ngx-leaflet';

@Directive({
  selector: '[gdMapWrapper]'
})
export class MapWrapperDirective implements OnInit, OnChanges, OnDestroy {
  mapWrapper: LeafletDirectiveWrapper;

  drawControl: L.Control.Draw;
  zoomControl: L.Control.Zoom;
  layer: L.Layer;
  map: L.Map;
  drawOptions: L.Control.DrawConstructorOptions = {
    position: 'topright',
    edit: {
      featureGroup: new L.FeatureGroup(),
      remove: true,
      edit: false
    },
    draw: <L.Control.DrawOptions>{
      marker: false,
      rectangle: false,
      circle: false,
      circlemarker: false,
      polyline: false,
      polygon: {
        drawError: {
          color: '#e1e100', // Color the shape will turn when intersects
          message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
        },
        shapeOptions: {
          color: '#bada55'
        }
      }
    }
  };
  @Input() isCollapsed = false;

  @Input() mask: string;
  @Output() maskChange = new EventEmitter<string>();
  @Output() polygonCreated = new EventEmitter<boolean>();

  constructor(
    private _ld: LeafletDirective
  ) {
    this.mapWrapper = new LeafletDirectiveWrapper(this._ld);
  }

  ngOnInit() {

    this.map = this.mapWrapper.getMap();
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

      // POLYLINE, must not be polygon, or the first coords and the last one will not be correct
      const maskGeojson = L.polyline(newLayer['editing']['latlngs'][0]).toGeoJSON();
      const mask = Object.assign(maskGeojson, {
        geometry: {
          type: 'Polygon',
          coordinates: (maskGeojson.geometry.coordinates as number[][][]).map(el => el.map(item => item.reverse()))
        }
      });
      this.maskChange.emit(JSON.stringify(mask));

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
