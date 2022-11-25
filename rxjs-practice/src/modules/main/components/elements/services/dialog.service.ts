import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver, ComponentRef,
  EmbeddedViewRef,
  Inject,
  Injectable, Injector, QueryList,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { MDialogOverlayComponent } from '../components/m-dialog-overlay/m-dialog-overlay.component';


@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private embeddedView: EmbeddedViewRef<unknown> | null;
  private componentRef: ComponentRef<MDialogOverlayComponent> | null;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
  ) {}

  attachTemplate(template: TemplateRef<unknown>, options?: any): EmbeddedViewRef<unknown> {
    if (this.componentRef) {
      this.removeComponent();
    }
    const factory = this.componentFactoryResolver.resolveComponentFactory(MDialogOverlayComponent);
    const ref = factory.create(this.appRef.injector);
    this.appRef.attachView(ref.hostView);
    const domElem = (ref.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    this.document.body.appendChild(domElem);
    this.componentRef = ref;

    this.componentRef.instance.childTemplate = template;
    this.componentRef.instance.dialogOptions = options;

    return ref.hostView as EmbeddedViewRef<any>;
  }

  attachComponent(viewContainerRef: ViewContainerRef, componentClass: any): ComponentRef<unknown> {
    if (this.componentRef) {
      this.removeComponent();
    }
    this.componentRef = viewContainerRef.createComponent(componentClass);
    return this.componentRef;
  }

  removeComponent(): void {
    if (this.embeddedView) {
      this.embeddedView.destroy();
      this.embeddedView = null;
    }
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
