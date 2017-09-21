import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[gdActionBtn]'
})
export class ActionBtnDirective {
  @Input() action: string;
  @Input() expanded: string;
  @Output() expandedChange = new EventEmitter<string>();
  @HostListener('click') onClick() {
    this.expanded = this.expanded === this.action ? undefined : this.action;
    this.expandedChange.emit(this.expanded);
  }
}
