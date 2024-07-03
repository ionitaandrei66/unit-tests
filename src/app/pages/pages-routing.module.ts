import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsTestComponent} from "./forms-test/forms-test.component";
import {PagesComponent} from "./pages.component";
import {ComplexServiceComponent} from "./complex-service/complex-service.component";

const routes: Routes = [
    {path: '', component: PagesComponent,
    children: [
        {path:'forms', component:ComplexServiceComponent},
        {
            path: '',
            redirectTo: 'forms',
            pathMatch: 'full',
        },
        {
            path: '**',
            redirectTo: 'forms',
        },]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
