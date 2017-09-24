import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[gdHost]'
})
export class HostDirective {
  constructor (
    public viewContainerRef: ViewContainerRef
  ) { }
}
