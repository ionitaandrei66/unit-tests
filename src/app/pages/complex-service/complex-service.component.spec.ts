import { ComponentFixture, TestBed } from '@angular/core/testing';

import {FormsTestComponent} from "../forms-test/forms-test.component";
import {AuthModel, HttpMethodsService} from "../../services/httpservice.service";
import {CommonModule} from "@angular/common";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {BehaviorSubject, of} from "rxjs";
import {ComplexServiceComponent} from "./complex-service.component";


fdescribe('FormsTestComponent', () => {
  let component: ComplexServiceComponent;
  let fixture: ComponentFixture<ComplexServiceComponent>;
  let mainService: HttpMethodsService;
  const mainSpy = jasmine.createSpyObj('HttpMethodsService', ['upDateObs']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplexServiceComponent ],
      imports:[   CommonModule, ReactiveFormsModule],
      providers: [FormBuilder, {provide: HttpMethodsService, useValue: mainSpy}]
    })
        .compileComponents();
    mainService = TestBed.inject(HttpMethodsService);
    mainSpy.upDateObs.and.returnValue(of(undefined));

  });
  fit('valid form and register', () => {
    const loader = new BehaviorSubject<boolean>(false);
    const obsData = new BehaviorSubject<number>(0);
    mainSpy.upDateObs.and.callFake(() => {
      loader.next(Math.random() < 0.5);
      obsData.next(Math.random() * 10);
    });

    fixture = TestBed.createComponent(ComplexServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(mainSpy.upDateObs).toHaveBeenCalled();
  });
});
