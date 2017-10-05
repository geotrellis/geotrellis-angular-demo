import { Component, EventEmitter, HostBinding, Input, Output, OnInit, OnChanges } from '@angular/core';
interface HostComponent {
  data: any;
  expanded: string;
}
@Component({
  selector: 'gd-layer-card',
  templateUrl: './layer-card.component.html'
})
export class LayerCardComponent implements OnInit, OnChanges {

  @HostBinding('class.-on') @Input() show: boolean;

  @Output() showChange = new EventEmitter<boolean>();

  @Input() opacity: number;
  @Output() opacityChange = new EventEmitter<number>();

  @Input() values: string[] | number[];
  @Output() valuesChange = new EventEmitter<any>();

  @Input() info: any;

  @Input() isSingle: boolean;
  @Input() isLoading: boolean;

  name: string;
  title: string;
  presets: any[];
  layerActions: {
    info: {
      infoText: string;
      palettes: string[];
    };
    params: {
      quant: number;
      qual: any;
    };
    opacity: boolean;
  };
  modelActions: {
    summary: boolean;
  };
  infoText: string;
  fakeArr: number[];
  quant: any;
  qual: any;
  @Input() summary: JSON;

  @Input() expanded: string;
  @Output() expandedChange = new EventEmitter<string>();
  showMenu = false;

  @Input() palette: string[] | string;
  @Output() paletteChange = new EventEmitter<string>();
  palettes: string[];

  optional: string[];

  toAbs(val: number): number {
    return Math.abs(val);
  }

  getPreset(val: string): void {
    const valArray = val.split(',').map(el => {
      if (el === 'undefined') {
        this.expanded = 'params';
        return undefined;
      } else if (Number.isInteger(Number(el))) {
        // only string with pure number can be returned as Number
        return Number(el);
      } else {
        return el;
      }
    });
    if (valArray[0] !== undefined) {
      this.valuesChange.emit(valArray);
    }
  }

  objKeys(object: object | undefined): string[] {
    if (object) {
      return Object.keys(object);
    } else { return undefined; }
  }

  ngOnInit() {
    this.name = this.info.name;
    this.title = this.info.title;
    this.presets = this.info.presets;
    this.layerActions = this.info.layerActions;
    this.modelActions = this.info.modelActions;
    if (this.layerActions['info']) {
      this.infoText = this.layerActions['info'].infoText;
      this.palettes = this.layerActions['info'].palettes ? this.layerActions['info'].palettes : undefined;
    }
    if (this.layerActions['params']) {
      this.quant = this.layerActions['params'].quant ? this.layerActions['params'].quant : undefined;
      this.qual = this.layerActions['params'].qual ? this.layerActions['params'].qual : undefined;
    }
  }

  ngOnChanges(changes) {
    if (changes.values && changes.values.currentValue !== undefined) {
      this.fakeArr = Array(this.values.length).fill(0);
    }
  }
}
