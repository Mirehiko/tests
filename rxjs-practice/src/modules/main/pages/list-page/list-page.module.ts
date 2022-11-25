import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { ElementsModule } from '../../components/elements/elements.module';
import { IconsModule } from '../../components/icons/icons.module';
import { CustomListModule } from '../../components/list-module/custom-list.module';
import { CustomDirectivesModule } from '../../directives/custom-directives.module';
import { FiltersComponent } from './filters-component/filters.component';
import { ListPageComponent } from './list-page.component';
import { ListPageRoutingModule } from './list-page-routing.module';


@NgModule({
  declarations: [
    ListPageComponent,
    FiltersComponent,
  ],
  imports: [
    ComponentsModule,
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
