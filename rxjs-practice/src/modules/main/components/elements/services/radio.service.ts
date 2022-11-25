import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable()
export class RadioService {
  value: string
  value$ = new BehaviorSubject<string>('');

  setValue(value: string): void {
    this.value = value;
    this.value$.next(this.value);
  }

  getValue(): string {
    return this.value;
  }
}
