import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    list: routerModel[]=[{
      url:'forms',name: 'Reactive Forms Test'
    }];
    constructor(private router: Router) {
     }

    activateRout(item:routerModel) {
        this.router.navigateByUrl(item.url);
    }
}

export interface routerModel
{url:string, name: string}
