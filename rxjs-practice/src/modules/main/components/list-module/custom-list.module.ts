import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomDirectivesModule } from '../../directives/custom-directives.module';
import { BaseListComponent } from './base-list.component';
import { BaseListItemComponent } from './list-items/base-list-item.component';
import { FilterPipe } from './pipes/filter.pipe';


@NgModule({
  declarations: [
    BaseListComponent,
    BaseListItemComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomDirectivesModule
  ],
  exports: [
    BaseListComponent,
    BaseListItemComponent
  ],
})
export class CustomListModule { }
