import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsTestComponent } from './forms-test.component';
import {AuthModel, HttpMethodsService} from "../../services/httpservice.service";
import {CommonModule} from "@angular/common";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {of} from "rxjs";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";

fdescribe('FormsTestComponent', () => {
  let component: FormsTestComponent;
  let fixture: ComponentFixture<FormsTestComponent>;
  let mainService: HttpMethodsService;
  const mainSpy = jasmine.createSpyObj('HttpMethodsService', ['getAuth','registerAuth']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsTestComponent ],
      imports:[   CommonModule, ReactiveFormsModule],
      providers: [FormBuilder, {provide: HttpMethodsService, useValue: mainSpy}]
    })
    .compileComponents();

    const mockData: AuthModel | null=null;
    mainService = TestBed.inject(HttpMethodsService);
    mainSpy.getAuth.and.returnValue(of(mockData));
    fixture = TestBed.createComponent(FormsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  fit('valid form and register', () => {
    expect(component).toBeTruthy();
  });

  fit('should set openNotification and notificationMessage on successful getAuth', () => {
      const mockData: AuthModel | null={
          username: 'user',
          password: 'alibaba',
          role: 'admin',
          uuid: '1234567890'
      }
      mainSpy.getAuth.and.returnValue(of(mockData));
    expect(component).toBeTruthy();
    expect(mainService.getAuth).toHaveBeenCalled();
    expect(component.openNotification).toEqual(true);
    expect(component.notificationMessage).toBe('U are logged now!');
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement.querySelector('.element');
    const notificationMessage = element.textContent;
    const buttonDebugElement = fixture.debugElement.query(By.css('.exit'));
    expect(notificationMessage.trim()).toContain('U are logged now!');
    expect(buttonDebugElement).toBeTruthy();
    expect(element).toBeTruthy();
  });

  fit('register method', () => {
    let passwordErrorElement = fixture.nativeElement.querySelector('#PasswordHelp');
    let minLengthErrorElement = fixture.nativeElement.querySelector('#PasswordHelp2');
    expect(passwordErrorElement.style.color).toEqual('red');
    expect(minLengthErrorElement.style.color).toEqual('red');
    const username = 'test@example.com';
    const password = 'Test123';
    component.form.setValue({ username, password });
    fixture.detectChanges();
    expect(passwordErrorElement.style.color).toEqual('green');
    expect(minLengthErrorElement.style.color).toEqual('green');
    const buttonDebugElement = fixture.debugElement.query(By.css('.register'));
    const mockData: AuthModel | null={
      username: 'user',
      password: 'alibaba',
      role: 'admin',
      uuid: '1234567890'
    }
    mainSpy.registerAuth.and.returnValue(of(mockData));
    buttonDebugElement.triggerEventHandler('click',{});
    expect(mainSpy.registerAuth).toHaveBeenCalledWith({ username, password });
    expect(component.openNotification).toEqual(true);
    expect(component.notificationMessage).toBe('The Account was created!');
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement.querySelector('.element');
    const notificationMessage = element.textContent;
    const buttonDebugElement2 = fixture.debugElement.query(By.css('.exit'));
    expect(notificationMessage.trim()).toContain('The Account was created!');
    expect(buttonDebugElement2).toBeTruthy();
    expect(element).toBeTruthy();
    buttonDebugElement2.triggerEventHandler('click',{});
    expect(component.openNotification).toEqual(false);
    fixture.detectChanges();
    const elementAfter = fixture.debugElement.nativeElement.querySelector('.element');
    expect(elementAfter).toBeFalsy();
    const form = component.form;
    Object.keys(form.controls).forEach(controlName => {
      const control = form.get(controlName);
      expect(control?.value).toBeNull();
    });
  });


});
