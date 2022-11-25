import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { ElementsModule } from '../../components/elements/elements.module';
import { IconsModule } from '../../components/icons/icons.module';
import { CustomDirectivesModule } from '../../directives/custom-directives.module';
import { DetailsPageComponent } from './details-page.component';


@NgModule({
  declarations: [
    DetailsPageComponent,
  ],
  imports: [
    CustomDirectivesModule,
    ComponentsModule,
    CommonModule,
    IconsModule,
    ElementsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: DetailsPageComponent
      }
    ]),
  ],
  entryComponents: [
    DetailsPageComponent,
  ],
  exports: [
  ],
})
export class DetailsPageModule {
}
