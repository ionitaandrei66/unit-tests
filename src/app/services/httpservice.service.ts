import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, take} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpMethodsService {

  loader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  obsData: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor(private http: HttpClient) {}


  getAuth(): Observable<AuthModel | null> {
    return this.http.get<AuthModel | null>(`${environment.url}/auth/getAuth`);
  }

  registerAuth(data: {username: string, password:string}): Observable<AuthModel | null> {
    return this.http.post<AuthModel | null>(`${environment.url}/auth/register`,
        {username:data?.username,password: data?.password});
  }

  upDateObs(){
    this.loader.next( Math.random() < 0.5);
    this.obsData.next(Math.random() * 10)
  }
}

export interface AuthModel {
  username: string;
  password: string;
  role?: string;
  uuid?: string;
}
