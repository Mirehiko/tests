import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  Inject,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MInputDirective } from '../../directives/m-input.directive';
import { DataModel } from '../data.model';
import { MRadioButtonComponent } from '../m-radio-button/m-radio-button.component';


@Component({
  selector: 'm-radio-group',
  templateUrl: './m-radio-group.component.html',
  styleUrls: ['m-radio-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MRadioGroupComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => MRadioGroupComponent),
    }
  ],
  host: {
    class: 'm-radio-group'
  }
})
export class MRadioGroupComponent extends MInputDirective implements AfterContentInit {
  @ContentChildren(MRadioButtonComponent, { descendants: false }) radioButtons: QueryList<MRadioGroupComponent>;
  public name: string;
  dataModel: DataModel;

  constructor(
    @Inject(ElementRef) el: ElementRef,
    private cd: ChangeDetectorRef
  ) {
    super(el);
    MRadioGroupComponent.counter++;
    this.name = `m-group` + MRadioGroupComponent.counter;
    this.dataModel = new DataModel(this.value);

    this.sub$.add(this.dataModel.value$.subscribe((val: string[]) => {
      this.value = val;
    }));
  }

  ngAfterContentInit(): void {
    this.radioButtons.toArray().forEach((value, index) => {
      value.dataModel = this.dataModel;
    });
  }
}
