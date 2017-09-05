import { Component, EventEmitter, HostBinding, Input, Output, OnInit } from '@angular/core';

@Component({
    selector: 'gd-layer-card',
    templateUrl: './layer-card.component.html'
})
export class LayerCardComponent implements OnInit {

    @HostBinding('class.-on') @Input() show = true;
    @Output() showChange = new EventEmitter<boolean>();

    @Input() opacity: number;
    @Output() opacityChange = new EventEmitter<number>();

    @Input() weights: number[] = [];
    @Output() weightsChange = new EventEmitter<number[]>();

    @Input() info: any;
    name: string;
    title: string;
    presets: {
        weights: number[],
        text: string
    };
    range: number;

    params: string[];
    @Input() summary: JSON;

    @Input() expanded: string;
    showMenu = false;

    @Input() palette: string[] | string;
    @Output() paletteChange = new EventEmitter<string>();
    palettes: string[];

    actions: string[] = ['info', 'weight', 'opacity'];
    optional: string[];

    itemWeightChange(): void {
        this.weightsChange.emit(this.weights);
    }
    toAbs(val: number): number {
        return Math.abs(val);
    }

    getPreset(val: string): void {
        const valArray = val.split(',').map(el => {
            return Number(el);
        });
        if (valArray.length > 1) {
            this.weightsChange.emit(valArray);
        } else {
            this.expanded = 'weight';
        }
    }

    constructor( ) { }

    ngOnInit() {
        this.name = this.info.name;
        this.title = this.info.title;
        this.range = this.info.range;
        this.params = this.info.prtext;
        this.optional = this.info.optional;
        this.palettes = this.info.palettes;
        this.presets = this.info.presets;
    }
}
