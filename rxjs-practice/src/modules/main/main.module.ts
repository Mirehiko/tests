import { HttpClientModule } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';


@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    MainRoutingModule,
    HttpClientModule,
  ],
  entryComponents: [
  ],
  exports: [
  ],
})
export class MainModule {
}
