import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from './icons/icons.module';
import { ItemBodyBlockComponent } from './item-body-block/item-body-block.component';
import { TypeListItemComponent } from './type-list-item/type-list-item.component';


@NgModule({
  declarations: [
    ItemBodyBlockComponent,
    TypeListItemComponent,
  ],
  imports: [
    IconsModule,
    CommonModule,
  ],
  exports: [
    ItemBodyBlockComponent,
    TypeListItemComponent,
  ],
})
export class ComponentsModule { }
