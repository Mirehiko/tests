import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Inject,
  Input, OnChanges, OnDestroy,
  SimpleChanges
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors, Validator
} from '@angular/forms';
import { fromEvent, Subject, Subscription, takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[m-input]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MInputDirective),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => MInputDirective),
    }
  ],
  host: {
    class: 'm-input'
  }
})
export class MInputDirective implements ControlValueAccessor, Validator, OnChanges, OnDestroy {
  public id: string;
  private _value: any;
  private touched: boolean = false;
  private disabled: boolean = false;
  protected focused: boolean = false;
  private parent: any;
  public sub$: Subscription = new Subscription();
  public _destroy$: Subject<void>;

  static counter: number = 0;

  @Input('value')
  get value() {
    return this._value;
  }

  set value(val) {
    if (val !== this._value) {
      this._value = val;
      this.el.nativeElement.value = val;
      this.onChange(this._value);
    }
  }

  updateChanges() {
    this.onChange(this.value);
  }

  @HostListener('focus')
  @HostListener('click') onMouseClick(e: MouseEvent) {
    this.focused = true;
    const documentClick$ = fromEvent(document, 'click');
    this._destroy$ = new Subject<void>();
    this.sub$.add(documentClick$.pipe(
      map((evt: any) => {
        evt.stopPropagation();
        if (evt.target.closest('.m-input-field') || !this.parent) {
          return;
        }
        this.focused = false;
        this._destroy$.next();
        this.parent.classList.remove('focused');
        this.setClasses();
      }),
      takeUntil(this._destroy$)
    ).subscribe());
    if (!this.parent) {
      return;
    }
    this.parent.classList.add('focused');
  }

  @HostListener('keyup', ['$event']) onInput(e: KeyboardEvent) {
    this.value = this.el.nativeElement.value;
  }

  setClasses(): void {
    if ((this.el.nativeElement.value && this.el.nativeElement.value.length) || this.value.length) {
      this.parent.classList.add('with-value');
    }
    else {
      this.parent.classList.remove('with-value');
    }
  }

  constructor(
    @Inject(ElementRef) protected el: ElementRef,
  ) {
    MInputDirective.counter++;
    this.id = `input` + MInputDirective.counter;
    el.nativeElement.id = this.id;
  }

  ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.el.nativeElement.value = this.value;
    if (!this.parent) {
      this.parent = this.el.nativeElement.closest(".m-input-field");
    }
  }

  onChange(_: any) {
    if (_ && _.target && _.target.type === 'checkbox') {
      this.value = _.target.value;
    }
    if (!this.parent) {
      return;
    }
    this.setClasses();
  }

  onTouch: any = () => {}

  writeValue(value: string) {
    if (value !== this._value) {
      this._value = value;
      this.el.nativeElement.value = value;
      this.onChange(this._value);
    }
  }

  onCurrentChange(value: string): void {
    this.value = value || '';
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouch = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouch();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value !== '') {
      return {
        mustHasValue: {
          value
        }
      };
    }
    return null;
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
