import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { IconsModule } from '../icons/icons.module';
import { MDialogOverlayComponent } from './components/m-dialog-overlay/m-dialog-overlay.component';
import { MButtonComponent } from './components/m-button/m-button.component';
import { MCheckboxButtonComponent } from './components/m-checkbox-button/m-checkbox-button.component';
import { MIconComponent } from './components/m-icon/m-icon.component';
import { MInputFieldComponent } from './components/m-input-field/m-input-field.component';
import { MLabelComponent } from './components/m-label/m-label.component';
import { MOptionComponent } from './components/m-option/m-option.component';
import { MPaginatorComponent } from './components/m-paginator/m-paginator.component';
import { MRadioButtonComponent } from './components/m-radio-button/m-radio-button.component';
import { MRadioGroupComponent } from './components/m-radio-group/m-radio-group.component';
import { MSelectPanelComponent } from './components/m-select-panel/m-select-panel.component';
import { MSelectTriggerComponent } from './components/m-select-trigger/m-select-trigger.component';
import { MSelectComponent } from './components/m-select/m-select.component';
import { ElementsDirectivesModule } from './directives/elements-directives.module';
import { MInputButtonDirective } from './directives/m-input-button.directive';


@NgModule({
  declarations: [
    MButtonComponent,
    MInputFieldComponent,
    MIconComponent,
    MLabelComponent,
    MRadioGroupComponent,
    MRadioButtonComponent,
    MCheckboxButtonComponent,
    MInputButtonDirective,
    MOptionComponent,
    MSelectComponent,
    MSelectPanelComponent,
    MDialogOverlayComponent,
    MSelectTriggerComponent,
    MPaginatorComponent,
  ],
  imports: [
    CommonModule,
    IconsModule,
    ElementsDirectivesModule,
  ],
  exports: [
    MButtonComponent,
    MInputFieldComponent,
    ElementsDirectivesModule,
    MIconComponent,
    MLabelComponent,
    MRadioGroupComponent,
    MRadioButtonComponent,
    MCheckboxButtonComponent,
    MOptionComponent,
    MSelectComponent,
    MSelectPanelComponent,
    MDialogOverlayComponent,
    MSelectTriggerComponent,
    MPaginatorComponent,
  ],
})
export class ElementsModule {
}
