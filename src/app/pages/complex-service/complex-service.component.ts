import {Component, OnInit} from '@angular/core';
import {HttpMethodsService} from "../../services/httpservice.service";
import {Observable, of, takeUntil} from "rxjs";

@Component({
  selector: 'app-complex-service',
  templateUrl: './complex-service.component.html',
  styleUrls: ['./complex-service.component.scss']
})
export class ComplexServiceComponent implements OnInit{

  data: number = 0;
  bool: Observable<boolean> = of(false);
  constructor( private mainService: HttpMethodsService) {
  }

  ngOnInit(): void {
    this.bool = this.mainService?.loader?.asObservable();
    this.mainService?.obsData?.subscribe((res: number) =>{
      this.data = res
        }
    );

    this.mainService?.upDateObs();
  }

}
