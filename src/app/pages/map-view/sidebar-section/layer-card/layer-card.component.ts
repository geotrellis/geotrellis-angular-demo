import { Component, EventEmitter, HostBinding, Input, Output, OnInit, OnChanges } from '@angular/core';

@Component({
    selector: 'gd-layer-card',
    templateUrl: './layer-card.component.html'
})
export class LayerCardComponent implements OnInit, OnChanges {

    @HostBinding('class.-on') @Input() show = true;
    @Output() showChange = new EventEmitter<boolean>();

    @Input() opacity: number;
    @Output() opacityChange = new EventEmitter<number>();

    @Input() values: number[] = [];
    @Output() valuesChange = new EventEmitter<number[]>();

    @Input() info: any;
    name: string;
    title: string;
    presets: any[];
    actions: string[];
    infotext: string;
    range: number;

    params: string[];
    @Input() summary: JSON;

    @Input() expanded: string;
    showMenu = false;

    @Input() palette: string[] | string;
    @Output() paletteChange = new EventEmitter<string>();
    palettes: string[];

    optional: string[];

    itemValueChange(): void {
        this.valuesChange.emit(this.values);
    }
    toAbs(val: number): number {
        return Math.abs(val);
    }

    getPreset(val: string): void {
        const valArray = val.split(',').map(el => {
            return Number(el);
        });
        console.log(valArray);
        if (!isNaN(valArray[0])) {
            this.valuesChange.emit(valArray);

        } else if (this.actions.includes('weight')) {
            this.expanded = 'weight';
        } else if (this.actions.includes('params')) {
            this.expanded = 'params';
        }
    }

    constructor() { }

    ngOnInit() {
        this.name = this.info.name;
        this.title = this.info.title;
        this.range = this.info.range;
        this.params = this.info.prtext;
        this.optional = this.info.optional;
        this.palettes = this.info.palettes;
        this.presets = this.info.presets;
        this.actions = this.info.actions;
        this.infotext = this.info.infotext;
    }

    ngOnChanges(changes) {
        if (changes.summary && changes.summary.currentValue !== undefined) {
            this.expanded = 'summary';
        }
    }
}
