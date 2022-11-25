import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ArrowIconComponent } from './arrow-icon/arrow-icon.component';
import { BaseIconDirective } from './base-icon.directive';
import { NextIconComponent } from './next-icon/next-icon.component';
import { PrevIconComponent } from './prev-icon/prev-icon.component';


@NgModule({
  declarations: [
    ArrowIconComponent,
    BaseIconDirective,
    NextIconComponent,
    PrevIconComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ArrowIconComponent,
    BaseIconDirective,
    NextIconComponent,
    PrevIconComponent,
  ],
})
export class IconsModule {
}
