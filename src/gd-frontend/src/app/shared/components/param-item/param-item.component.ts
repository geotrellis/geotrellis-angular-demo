import { Component, EventEmitter, HostBinding, Input, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'gd-param-item',
  templateUrl: './param-item.component.html'
})
export class ParamItemComponent {
  @ViewChild('desc') desc: ElementRef;
  @ViewChild('num') num: ElementRef;
  @Input() value: number | string;

  @Input() param: string;
  @Input() range: any;
  @Input() selection: any;

  @Output() valueChange = new EventEmitter<number | string>();
  @HostBinding('class.-inactive') isInactive = false;

  prevDesc: number;
  prevNum: number;

  abs(num: number): number {
    return Math.abs(num);
  }

  isNumber(val: any): boolean {
    return Number.isInteger(val);
  }

  genRange(num: number): number[] {
    return Array.from({ length: num }, (v, k) => k);
  }

  objKeys(object: object | undefined): string[] {
    if (object) {
      return Object.keys(object);
    } else { return undefined; }
  }

  neglectParam(desc: number, num: number): void {
    // record previous state
    if (this.isInactive === false) {
      this.prevDesc = desc;
      this.prevNum = num;
      this.valueChange.emit(0);
    } else {
      this.num.nativeElement.value = this.prevNum;
      this.desc.nativeElement.value = this.prevDesc;
      this.valueChange.emit(this.prevNum * this.prevDesc);
    }
    this.isInactive = !this.isInactive;
  }

  updateValue(desc: number | string, num?: number): void {
    if (num) {
      this.valueChange.emit(Number(desc) * Number(num));
    } else {
      this.valueChange.emit(desc);
    }
  }
}
