import {
  AfterContentInit, AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  forwardRef,
  Inject,
  QueryList, TemplateRef,
  ViewChild, ViewContainerRef, ViewRef,
} from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MInputDirective } from '../../directives/m-input.directive';
import { DialogService } from '../../services/dialog.service';
import { DataModel } from '../data.model';
import { MOptionComponent } from '../m-option/m-option.component';
import { MSelectTriggerComponent } from '../m-select-trigger/m-select-trigger.component';



@Component({
  selector: 'm-select',
  templateUrl: './m-select.component.html',
  styleUrls: ['m-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MSelectComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => MSelectComponent),
    }
  ],
  host: {
    class: 'm-select'
  }
})
export class MSelectComponent extends MInputDirective implements AfterContentInit, AfterViewInit {
  @ContentChildren(MOptionComponent, {descendants: false}) options: QueryList<MOptionComponent>;
  @ContentChild(MSelectTriggerComponent) trigger: MSelectTriggerComponent;
  @ViewChild('triggerTpl') triggerTpl: TemplateRef<any>;
  @ViewChild('panel') panel: TemplateRef<any>;
  @ViewChild('valueTpl') valueTpl: TemplateRef<any>;
  @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;
  dataModel: DataModel;
  viewRef: ViewRef;

  constructor(
    @Inject(ElementRef) el: ElementRef,
    private componentRef: ViewContainerRef,
    private dialogService: DialogService,
  ) {
    super(el)
    this.id = `m-select` + MSelectComponent.counter;
    this.dataModel = new DataModel(!!this.value ? [this.value] : []);

    this.sub$.add(this.dataModel.value$.subscribe((val: string[]) => {
      this.value = val;
      if (this.viewRef) {
        this.viewRef.detectChanges();
      }
    }));
  }

  ngAfterViewInit(): void {
    this.viewRef = this.trigger
      ? this.triggerTpl.createEmbeddedView(null)
      : this.viewRef = this.valueTpl.createEmbeddedView(null);
    this.vc.insert(this.viewRef);
  }

  ngAfterContentInit(): void {
    this.sub$.add(this.options.changes.subscribe((data: QueryList<MOptionComponent>) => {
      data.toArray().forEach((value, index) => {
        value.dataModel = this.dataModel;
      });
    }));
  }

  open(): void {
    const position = this.el.nativeElement.getBoundingClientRect();
    const ref = this.dialogService.attachTemplate(this.panel, {
      position: {
        top: `${position.top + this.el.nativeElement.offsetHeight + 8}px`,
        left: `${position.left}px`
      }, width: `${this.el.nativeElement.offsetWidth}px`
    });
  }
}
