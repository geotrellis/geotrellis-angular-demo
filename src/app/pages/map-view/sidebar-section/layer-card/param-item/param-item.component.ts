import { Component, OnInit, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'gd-param-item',
  templateUrl: './param-item.component.html'
})
export class ParamItemComponent implements OnInit {
  @Input() value: number | string;
  @Input() param: string;
  @Input() range: number;
  @Output() valueChange = new EventEmitter<number | string>();
  @HostBinding('class.-inactive') isInactive = false;

  @Input() type: string;

  abs(num: number): number {
    return Math.abs(num);
  }

  isNumber(val: any): boolean {
    return Number.isInteger(val);
  }
  genRange(num: number): number[] {
    return Array.from({ length: num }, (v, k) => k);
  }

  neglectParam(desc: number, num: number): void {
    // previous state
    if (this.isInactive) {
      this.valueChange.emit(desc * num);
    } else {
      this.valueChange.emit(0);
    }
    this.isInactive = !this.isInactive;
  }

  updateValue(desc: number | string, num?: number): void {
    if (num) {
      this.valueChange.emit(Number(desc) * num);
    } else {
      this.valueChange.emit(desc);
    }
  }
  constructor() { }

  ngOnInit() {
  }

}
