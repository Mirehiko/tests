import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from './main.component';


const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: 'goods',
        loadChildren: () => import("./pages/list-page/list-page.module").then(m => m.ListPageModule),
      },
      { path: '**', redirectTo: 'goods' }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class MainRoutingModule {
}
