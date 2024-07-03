import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsTestComponent } from './forms-test/forms-test.component';
import {PagesComponent} from "./pages.component";
import {ReactiveFormsModule} from "@angular/forms";
import { ComplexServiceComponent } from './complex-service/complex-service.component';


@NgModule({
  declarations: [
    FormsTestComponent,
    PagesComponent,
    ComplexServiceComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
