import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'iconDir',
})
export class BaseIconDirective {
  @Input() public fillColor: string = '#2962FF';
}
