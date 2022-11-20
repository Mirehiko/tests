import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { CustomListModule } from '../../components/list-module/custom-list.module';
import { CustomDirectivesModule } from '../../directives/custom-directives.module';
import { ListPageComponent } from './list-page.component';
import { ListPageRoutingModule } from './list-page-routing.module';


@NgModule({
  declarations: [
    ListPageComponent,
  ],
  imports: [
    ListPageRoutingModule,
    CustomDirectivesModule,
    CustomListModule,
    CommonModule,
  ],
  entryComponents: [
    ListPageComponent,
  ],
  exports: [
  ],
})
export class ListPageModule {
}
