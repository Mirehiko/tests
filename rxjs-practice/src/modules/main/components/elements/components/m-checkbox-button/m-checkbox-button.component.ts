import {
  ChangeDetectionStrategy,
  Component, ElementRef, forwardRef, Inject, Output
} from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MInputButtonDirective } from '../../directives/m-input-button.directive';
import { MInputDirective } from '../../directives/m-input.directive';
import { MRadioGroupComponent } from '../m-radio-group/m-radio-group.component';


@Component({
  selector: 'm-checkbox',
  templateUrl: './m-checkbox-button.component.html',
  styleUrls: ['m-checkbox-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MCheckboxButtonComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => MCheckboxButtonComponent),
    }
  ],
  host: {
    class: 'm-checkbox-button'
  }
})
export class MCheckboxButtonComponent extends MInputButtonDirective {
  static counter = 0;

  constructor() {
    super();
    this.id = `m-checkbox` + MRadioGroupComponent.counter++;
  }
}
