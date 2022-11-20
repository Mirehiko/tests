import {
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener, Inject,
  Input,
  OnChanges, OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';


@Directive({
  selector: '[inputDirective]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CustomInputDirective),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => CustomInputDirective),
    }
  ]
})
export class CustomInputDirective implements ControlValueAccessor, Validator, OnChanges, OnInit {
  private _value: string = ''
  touched: boolean = false;
  disabled: boolean = false;
  isChanged: boolean = false;
  @Output() contentChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() onEnter: EventEmitter<string> = new EventEmitter<string>();
  @Input() editable: boolean = false;
  @Input() lockEnter: boolean = false;
  @Input() clearOnBlur: boolean = false;
  @Input() placeholder: string = '';
  @Input() minHeight: string = 'auto';
  @Input() classList: string = '';
  @Input() opacity: number = 0.5;
  @Output() focusChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() lastValue: EventEmitter<string> = new EventEmitter<string>();
  @Output() inputChanged: EventEmitter<string> = new EventEmitter<string>();
  protected focused: boolean = false;
  protected deleted: boolean = false;

  protected parentElement = document.createElement('div');
  protected placeholderElement = document.createElement('span');
  protected initiated: boolean = false;

  get value() {
    return this._value;
  }

  @Input()
  set value(val) {
    this._value = val || '';
    this.el.nativeElement.innerHTML = val || '';
    this.onChange(this._value);
  }

   updateChanges() {
     this.onChange(this.value);
   }

  @HostListener('focus')
  @HostListener('click') onMouseClick(e: MouseEvent) {
    this.setStyles(this.defaultEditStyle);
    this.focused = true;
    this.focusChanged.emit(this.focused);
    this.focus();
    this.changePlaceholderState();
  }

  @HostListener('keydown', ['$event']) onEnterDown(e: KeyboardEvent) {
    if ((e.keyCode === KeyCodeName.ENTER && this.lockEnter) || e.keyCode === KeyCodeName.ENTER && e.ctrlKey) {
      e.preventDefault();
      this.onEnter.emit(this.el.nativeElement.innerHTML);
    }
  }

  @HostListener('keyup', ['$event']) onInput(e: KeyboardEvent) {
    this._value = this.el.nativeElement.innerHTML;
    this.onChange(this._value);
    this.isChanged = true;
    this.contentChanged.emit(this.value);

    if (this.deleted) {
      return;
    }
  }

  @HostListener('mouseenter') onMouseEnter(e: MouseEvent) {
    this.setStyles(this.defaultHoverStyle);
  }

  @HostListener('blur') onMouseLeave() {
    if (this.deleted) {
      return;
    }
    if (this.clearOnBlur) {
      this.value = '';
      this.el.nativeElement.innerHTML = '';
    }
    this.setStyles(this.defaultStyle);

    this.focused = false;
    this.changePlaceholderState();
    this.focusChanged.emit(this.focused);
    if (this.isChanged) {
      this.lastValue.emit(this.el.nativeElement.innerHTML);
      this.isChanged = false;
    }
  }


  constructor(
    @Inject(ElementRef) protected el: ElementRef,
  ) {
    this.parentElement.classList.add('control-container');
    this.placeholderElement.classList.add('control-placeholder');
  }

  ngOnInit(): void {
    this.initControl();
    this.setStyles(this.defaultStyle);
  }

  public initControl() {
    if (this.initiated) {
      return;
    }
    this.placeholderElement.innerHTML = this.placeholder;
    this.placeholderElement.style.position = 'relative';
    this.placeholderElement.style.zIndex = '0';
    this.placeholderElement.style.top = '0';
    this.placeholderElement.style.left = '0';
    this.placeholderElement.style.width = '100%';
    this.placeholderElement.style.height = '100%';
    this.placeholderElement.style.lineHeight = 'initial';
    this.parentElement.style.position = 'relative';
    this.parentElement.style.display = 'inline-flex';
    this.parentElement.style.minHeight = `${this.minHeight}`;

    if (this.classList) {
      this.parentElement.classList.add(...this.classList.split(' '));
    }
    this.el.nativeElement.style.position = 'absolute';
    this.el.nativeElement.style.zIndex = '1';
    this.el.nativeElement.style.width = '100%';
    this.el.nativeElement.style.top = '0';
    this.el.nativeElement.style.left = '0';
    this.el.nativeElement.style.height = '100%';
    this.el.nativeElement.style.lineHeight = 'initial';
    this.el.nativeElement.parentElement.replaceChild(this.parentElement, this.el.nativeElement);
    this.parentElement.append(this.placeholderElement);
    this.parentElement.append(this.el.nativeElement);
    this.value = this.el.nativeElement.innerHTML;

    this.changePlaceholderState();
  }

  onChange(_: any) {}

  onTouch: any = () => {}

  writeValue(value: string) {
    this.value = value || '';
    this.el.nativeElement.innerHTML = value || '';
    this.updateChanges();
    this.changePlaceholderState();
  }

  onCurrentChange(value: string): void {
    this.value = value || '';
    this.el.nativeElement.innerHTML = value || '';
    this.changePlaceholderState();
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

  focus(): void {
    this.el.nativeElement.focus();
    // const sel = document.getSelection();
    // sel?.selectAllChildren(this.el.nativeElement);
    // sel?.collapseToEnd();
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
    if (changes['editable']?.currentValue) {
      this.setStyles(this.defaultEditStyle);
      this.focused = true;
      this.focusChanged.emit(this.focused);

      this.focus();
    }
  }

  private setStyles(style: IElementStyle): void {
    this.el.nativeElement.style.backgroundColor = style.bgColor || '';
    this.el.nativeElement.style.color = style.color || '';
    if (!this.focused) {
      this.el.nativeElement.style.cursor = style.cursor || 'default';
    }
    this.el.nativeElement.style.outline = style.outline || '0';
    this.el.nativeElement.contentEditable = `${!!style.contentEditable}`;
    this.el.nativeElement.parentElement.style.width = style.width;
    this.el.nativeElement.style.height = style.height || '100%';
  }

  private changePlaceholderState(): void {
    if ((this.value && this.value.length) || this.focused) {
      this.placeholderElement.style.opacity = '0';
      this.el.nativeElement.style.position = 'relative';
      this.placeholderElement.style.position = 'absolute';
      this.placeholderElement.classList.add('placeholder-hidden');
      this.el.nativeElement.classList.add('input-focused');
    }
    else {
      this.placeholderElement.classList.remove('placeholder-hidden');
      this.el.nativeElement.classList.remove('input-focused');
      this.placeholderElement.style.opacity = `${this.opacity}`;
      this.el.nativeElement.style.position = 'absolute';
      this.placeholderElement.style.position = 'relative';
    }
  }

  private defaultStyle: IElementStyle = {
    color: 'inherit',
    bgColor: 'transparent',
    contentEditable: false,
    cursor: 'default',
    outline: '0',
    width: '100%',
  }

  private defaultHoverStyle: IElementStyle = {
    color: 'inherit',
    bgColor: 'transparent',
    contentEditable: true,
    cursor: 'text',
    outline: '0',
    width: '100%',
  }

  private defaultEditStyle: IElementStyle = {
    color: 'inherit',
    bgColor: 'transparent',
    contentEditable: true,
    cursor: 'text',
    outline: '0',
    width: '100%',
  }
}

@Directive({
  selector: '[listInputDirective]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CustomInputDirective),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => CustomInputDirective),
    }
  ]
})
export class CustomListInputDirective extends CustomInputDirective {
  public override onEnterDown(e: KeyboardEvent) {
    if (e.keyCode === KeyCodeName.ENTER) {
      e.preventDefault();
      this.onChange(this.el.nativeElement.innerHTML);
      this.el.nativeElement.blur();
      this.onEnter.emit(this.el.nativeElement.innerHTML);
    }
    if ((e.keyCode === KeyCodeName.ESCAPE || e.keyCode === KeyCodeName.DELETE) && this.el.nativeElement.innerHTML.trim().length === 0) {
      this.deleted = true;
    }
  }
}

export enum KeyCodeName {
  ARROW_UP = 38,
  ARROW_DOWN = 40,
  ARROW_LEFT = 37,
  ARROW_RIGHT = 39,
  ENTER = 13,
  DELETE = 46,
  HOME = 36,
  END = 35,
  ESCAPE = 27
}

export interface IElementStyle {
  color?: string;
  bgColor?: string;
  cursor?: string;
  outline?: string;
  contentEditable?: boolean;
  width?: string | number;
  top?: string;
  left?: string;
  height?: string;
}
