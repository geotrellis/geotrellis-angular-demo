import { Component, EventEmitter, HostBinding, Input, Output, OnInit, OnChanges } from '@angular/core';

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
    actions: string[];
    infoText: string;
    range: number;
    fakeArr: number[];
    type: string;

    params: string[];
    @Input() summary: JSON;

    @Input() expanded: string;
    @Output() expandedChange = new EventEmitter<string>();
    showMenu = false;

    @Input() palette: string[] | string;
    @Output() paletteChange = new EventEmitter<string>();
    palettes: string[];

    optional: string[];

    checkAction(action: string): boolean {
        return this.actions.includes(action);
    }

    toAbs(val: number): number {
        return Math.abs(val);
    }

    getPreset(val: string): void {
        const valArray = val.split(',').map(el => {
            if (el === 'undefined') {
                if (this.actions.includes('weight')) {
                    this.expanded = 'weight';
                } else if (this.actions.includes('params')) {
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

    ngOnInit() {
        this.name = this.info.name;
        this.title = this.info.title;
        this.range = this.info.range;
        this.params = this.info.paramsText;
        this.optional = this.info.optional;
        this.palettes = this.info.palettes;
        this.presets = this.info.presets;
        this.actions = this.info.actions;
        this.infoText = this.info.infoText;
    }

    ngOnChanges(changes) {
        if (changes.values && changes.values.currentValue !== undefined) {
        this.fakeArr = Array(this.values.length).fill(0);
        this.type = Number.isInteger((Number(this.values[0]))) ? 'number' : 'string';
        }
    }
}
