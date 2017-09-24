import { Type, Component, EventEmitter, HostBinding, Input, Output, OnInit, OnChanges, AfterViewInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { InfoPanelComponent } from './layer-action/info-panel/info-panel.component';
import { HostDirective } from '../../../../directives/host.directive';
interface HostComponent {
  data: any;
  expanded: string;
}
@Component({
  selector: 'gd-layer-card',
  templateUrl: './layer-card.component.html'
})
export class LayerCardComponent implements OnInit, OnChanges, AfterViewInit {

  @HostBinding('class.-on') @Input() show: boolean;
  @ViewChild(HostDirective) gdHost: HostDirective;

  @Output() showChange = new EventEmitter<boolean>();

  @Input() opacity: number;
  @Output() opacityChange = new EventEmitter<number>();

  @Input() values: string[] | number[];
  @Output() valuesChange = new EventEmitter<any>();

  @Input() info: any;

  @Input() isSingle: boolean;
  @Input() isLoading: boolean;
  components = {
    info: (InfoPanelComponent as Type<any>),
  };
  name: string;
  title: string;
  presets: any[];
  layerActions: {
    info: {
      infoText: string;
      palettes: string[];
    };
    params: {
      paramsText: string[];
      quant: number;
      qual: string[];
    };
    opacity: boolean;
  };
  modelActions: {
    summary: boolean;
  };
  paramsText: string[];
  infoText: string;
  fakeArr: number[];
  type: string;
  quant: number;
  qual: string[];
  @Input() summary: JSON;

  @Input() expanded: string;
  @Output() expandedChange = new EventEmitter<string>();
  showMenu = false;

  @Input() palette: string[] | string;
  @Output() paletteChange = new EventEmitter<string>();
  palettes: string[];

  optional: string[];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  toAbs(val: number): number {
    return Math.abs(val);
  }

  getPreset(val: string): void {
    const valArray = val.split(',').map(el => {
      if (el === 'undefined') {
        if (this.layerActions['params'].quant) {
          this.expanded = 'weight';
        } else if (this.layerActions['params'].qual) {
          this.expanded = 'params';
        }
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

  loadComponents() {
    Object.keys(this.layerActions).forEach(el => {
      console.log(el, 'layerActions');
      el = 'info';
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.components[`${el}`]);

      const viewContainerRef = this.gdHost.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent(componentFactory);
      (<HostComponent>componentRef.instance).expanded = this.expanded;
      switch (el) {
        case 'info':
        if (this.palette) {
          (<HostComponent>componentRef.instance).data = Object.assign(this.layerActions[`${el}`], {
            palette: this.palette,
          });
        }
          break;
        default:
          break;
      }

    });
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
      this.paramsText = this.layerActions['params'].paramsText;
      this.quant = this.layerActions['params'].quant ? this.layerActions['params'].quant : undefined;
      this.qual = this.layerActions['params'].qual ? this.layerActions['params'].qual : undefined;
    }
  }

  ngOnChanges(changes) {
    if (changes.values && changes.values.currentValue !== undefined) {
      this.fakeArr = Array(this.values.length).fill(0);
      this.type = Number.isInteger((Number(this.values[0]))) ? 'number' : 'string';
    }
  }

  ngAfterViewInit() {
    this.loadComponents();
  }
}
