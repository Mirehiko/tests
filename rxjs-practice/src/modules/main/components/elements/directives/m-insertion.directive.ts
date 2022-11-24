import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[mInsertion]'
})
export class MInsertionDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
