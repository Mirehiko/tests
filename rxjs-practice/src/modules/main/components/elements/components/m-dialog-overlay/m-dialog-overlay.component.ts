import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver, EmbeddedViewRef,
  OnDestroy, TemplateRef,
  Type,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { MInsertionDirective } from '../../directives/m-insertion.directive';

@Component({
  selector: 'm-dialog-overlay',
  templateUrl: './m-dialog-overlay.component.html',
  styleUrls: ['m-dialog-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'm-dialog-overlay'
  }
})
export class MDialogOverlayComponent implements AfterViewInit, OnDestroy {
  embeddedRef: EmbeddedViewRef<any>;
  childTemplate: TemplateRef<any>;
  dialogOptions: any;

  private readonly _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();

  @ViewChild(MInsertionDirective) insertionPoint: MInsertionDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    // private dialogRef: DialogRef
  ) { }

  ngAfterViewInit(): void {
    this.loadChildComponent(this.childTemplate);
    this.cd.detectChanges();
    this.embeddedRef.rootNodes[0]
  }

  ngOnDestroy(): void {
    if (this.embeddedRef) {
      this.embeddedRef.destroy();
    }
  }

  loadChildComponent(templateRef: TemplateRef<any>): void {
    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.embeddedRef = viewContainerRef.createEmbeddedView(templateRef);
    if (this.dialogOptions) {
      if (this.dialogOptions.position) {
        this.embeddedRef.rootNodes[0].style.top = `${this.dialogOptions.position.top}` || 'auto';
        this.embeddedRef.rootNodes[0].style.left = `${this.dialogOptions.position.left}` || 'auto';
        this.embeddedRef.rootNodes[0].style.right = `${this.dialogOptions.position.right}` || 'auto';
        this.embeddedRef.rootNodes[0].style.bottom = `${this.dialogOptions.position.bottom}` || 'auto';
      }

      this.embeddedRef.rootNodes[0].style.width = `${this.dialogOptions.width}` || 'auto';
    }
  }

  onOverlayClicked(evt: MouseEvent): void {
    // this.dialogRef.close();
  }

  onDialogClicked(evt: MouseEvent): void {
    evt.stopPropagation();
  }

  close(): void {
    this._onClose.next('');
  }
}
