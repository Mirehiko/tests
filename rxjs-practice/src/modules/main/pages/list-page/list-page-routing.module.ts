import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailsPageGuard } from '../guards/details-page.guard';
import { ListPageComponent } from './list-page.component';


const routes: Routes = [
  {
    path: "",
    component: ListPageComponent,
    children: [
      {
        canActivate: [DetailsPageGuard],
        path: 'item/:id',
        loadChildren: () => import("./../details-page/details-page.module").then(m => m.DetailsPageModule),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class ListPageRoutingModule {
}
