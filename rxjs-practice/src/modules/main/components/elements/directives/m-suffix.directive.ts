import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[mSuffix]'
})
export class MSuffixDirective {
  @HostBinding('class') class = 'm-suffix';
}
