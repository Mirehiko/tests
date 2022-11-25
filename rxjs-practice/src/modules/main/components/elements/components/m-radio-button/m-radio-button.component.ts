import {
  ChangeDetectionStrategy,
  Component, TemplateRef, ViewChild
} from '@angular/core';
import { MInputButtonDirective } from '../../directives/m-input-button.directive';
import { DataModel } from '../data.model';
import { MRadioGroupComponent } from '../m-radio-group/m-radio-group.component';


@Component({
  selector: 'm-radio-button',
  templateUrl: './m-radio-button.component.html',
  styleUrls: ['m-radio-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'm-radio-button'
  }
})
export class MRadioButtonComponent extends MInputButtonDirective {
  public dataModel: DataModel
  static counter = 0;

  constructor() {
    super();
    this.id = `m-radio` + MRadioGroupComponent.counter++;
  }

  onChange(data: any): void {
    this.dataModel.value = this.value;
  }
}
