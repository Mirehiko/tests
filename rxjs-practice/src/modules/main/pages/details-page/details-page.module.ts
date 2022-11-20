import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomDirectivesModule } from '../../directives/custom-directives.module';
import { DetailsPageComponent } from './details-page.component';


@NgModule({
  declarations: [
    DetailsPageComponent,
  ],
  imports: [
    CustomDirectivesModule,
    CommonModule,
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
