import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component, ContentChild,
} from '@angular/core';
import { MInputDirective } from '../../directives/m-input.directive';


@Component({
  selector: 'm-input-field',
  templateUrl: './m-input-field.component.html',
  styleUrls: ['m-input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'm-input-field'
  }
})
export class MInputFieldComponent implements AfterContentInit {
  @ContentChild(MInputDirective) input: MInputDirective;
  public inputId: string;

  ngAfterContentInit(): void {
    if (this.input) {
      this.inputId = this.input.id;
    }
  }
}
