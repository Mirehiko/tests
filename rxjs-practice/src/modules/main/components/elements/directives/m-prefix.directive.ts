import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[mPrefix]'
})
export class MPrefixDirective {
  @HostBinding('class') class = 'm-prefix';
}
