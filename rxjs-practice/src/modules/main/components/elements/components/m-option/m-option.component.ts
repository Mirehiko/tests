import {
  ChangeDetectionStrategy,
  Component, Input,
} from '@angular/core';
import { DataModel } from '../data.model';


@Component({
  selector: 'm-option',
  templateUrl: './m-option.component.html',
  styleUrls: ['m-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'm-option'
  }
})
export class MOptionComponent {
  private _value: any;
  public dataModel: DataModel

  @Input()
  set value(value: any) {
    this._value = value;
  }

  get value() {return this._value}

  constructor() {
  }

  onChange(data: any): void {
    const includes = this.dataModel.value.indexOf(this.value);
    if ( includes !== -1 ) {
      this.dataModel.value = this.dataModel.value.filter((val: string) => val !== this.value);
      return;
    }
    this.dataModel.value = [...this.dataModel.value, this.value];
  }
}
