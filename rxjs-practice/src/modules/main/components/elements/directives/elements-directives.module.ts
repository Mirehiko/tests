import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MInputDirective } from './m-input.directive';
import { MInsertionDirective } from './m-insertion.directive';
import { MPrefixDirective } from './m-prefix.directive';
import { MSuffixDirective } from './m-suffix.directive';


@NgModule({
  declarations: [
    MPrefixDirective,
    MSuffixDirective,
    MInputDirective,
    MInsertionDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MPrefixDirective,
    MSuffixDirective,
    MInputDirective,
    MInsertionDirective,
  ],
})
export class ElementsDirectivesModule {
}
