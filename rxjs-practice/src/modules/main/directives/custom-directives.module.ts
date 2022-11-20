import { NgModule } from '@angular/core';
import { CustomInputDirective, CustomListInputDirective } from './custom-input.directive';


@NgModule({
  declarations: [
    CustomInputDirective,
    CustomListInputDirective,
  ],
  exports: [
    CustomInputDirective,
    CustomListInputDirective,
  ]
})
export class CustomDirectivesModule {}
