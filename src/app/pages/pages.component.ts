import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
  list: routerModel[]=[{
    url:'pages/forms',name: 'Reactive Forms Test'
  }];
  constructor(private router: Router) {
  }

  activateRout(item:routerModel) {
    this.router.navigateByUrl(item.url);
  }
}

export interface routerModel
{url:string, name: string}
