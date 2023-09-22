import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsTestComponent } from './forms-test/forms-test.component';
import {PagesComponent} from "./pages.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    FormsTestComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
