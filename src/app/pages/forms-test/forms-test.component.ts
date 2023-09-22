import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError, Subject, take} from 'rxjs';
import {AuthModel, HttpMethodsService} from "../../services/httpservice.service";

@Component({
  selector: 'app-forms-test',
  templateUrl: './forms-test.component.html',
  styleUrls: ['./forms-test.component.scss']
})
export class FormsTestComponent {
  form: FormGroup;
  openNotification: boolean = false;
  notificationMessage: string = '';
  private destroy$ = new Subject<boolean>();


  constructor(private fb: FormBuilder , private mainService: HttpMethodsService ) {
    this.form= this.fb.group({
      username: [null, [Validators.required,Validators.minLength(3)]],
      password: [null,[Validators.required,Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
     this.mainService.getAuth().pipe(take(1), catchError(()=> { return 'error'})).subscribe(
         (res)=>{
           if(res !== 'error'){
             this.openNotification = true;
             this.notificationMessage = 'U are logged now!';
           }
         }
     )
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  sendRegister() {
    const data : AuthModel | null = {
      username:this.form.controls['username']?.value,
      password:this.form.controls['password']?.value,
    };
    this.mainService.registerAuth(data).pipe(take(1), catchError(()=> { return 'error'})).subscribe(
        (res)=>{
          if(res !== 'error'){
            this.openNotification = true;
            this.notificationMessage = 'The Account was created!';
          }
        }
    )
  }

  closeNotification() {
    this.openNotification = false;
    this.form.setValue({username: null, password: null});
  }
}
