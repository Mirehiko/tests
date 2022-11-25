import {
  ChangeDetectionStrategy,
  Component, ElementRef, forwardRef, Inject, Input,
} from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MInputDirective } from '../../directives/m-input.directive';


@Component({
  selector: 'm-paginator',
  templateUrl: './m-paginator.component.html',
  styleUrls: ['m-paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MPaginatorComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => MPaginatorComponent),
    }
  ],
  host: {
    class: 'm-paginator'
  }
})
export class MPaginatorComponent extends MInputDirective {
  constructor(
    @Inject(ElementRef) el: ElementRef,
  ) {super(el);}

  prev(): void {
    if (this.value.prev !== 0) {
      const p = {
        prev: this.value.prev - 1,
        current: this.value.current - 1,
        next: this.value.next - 1,
      };
      this.value = p;
    }
  }

  next(): void {
    const p = {
      prev: this.value.prev + 1,
      current: this.value.current + 1,
      next: this.value.next + 1,
    };
    this.value = p;
  }
}
