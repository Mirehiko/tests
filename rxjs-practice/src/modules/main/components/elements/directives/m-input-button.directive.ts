import { Directive, Input, Output } from '@angular/core';

@Directive({
  selector: 'm-input-button',
})
export class MInputButtonDirective {
  private _value: any;
  @Input()
  set value(value: any) {
    this._value = value;
  }
  get value() {return this._value}

  private _name = '';
  @Input()
  set name(val) {
    this._name = val || '';
  }
  get name() {
    return this._name;
  }

  @Output()
  public id: string;
}
