import { BehaviorSubject } from 'rxjs';

export class DataModel {
  _value: any;
  value$: any;

  constructor(value: any) {
    this._value = value;
    this.value$ = new BehaviorSubject(value);
  }

  set value(value) {
    this._value = value;
    this.value$.next(value);
  }

  get value () {
    return this._value;
  }
}
