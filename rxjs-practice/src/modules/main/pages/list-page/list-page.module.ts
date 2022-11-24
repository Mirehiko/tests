import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ElementsModule } from '../../components/elements/elements.module';
import { IconsModule } from '../../components/icons/icons.module';
import { CustomListModule } from '../../components/list-module/custom-list.module';
import { CustomDirectivesModule } from '../../directives/custom-directives.module';
import { FiltersComponent } from './filters-component/filters.component';
import { ListPageComponent } from './list-page.component';
import { ListPageRoutingModule } from './list-page-routing.module';
import { TypeListItemComponent } from './type-list-item/type-list-item.component';


@NgModule({
  declarations: [
    ListPageComponent,
    TypeListItemComponent,
    FiltersComponent,
  ],
  imports: [
    IconsModule,
    ElementsModule,
    ListPageRoutingModule,
    CustomDirectivesModule,
    CustomListModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ListPageComponent,
  ],
  exports: [
  ],
})
export class ListPageModule {
}
