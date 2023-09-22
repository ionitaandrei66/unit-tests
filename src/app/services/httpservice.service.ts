import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpMethodsService {

  constructor(private http: HttpClient) {}


  getAuth(): Observable<AuthModel | null> {
    return this.http.get<AuthModel | null>(`${environment.url}/auth/getAuth`);
  }

  registerAuth(data: {username: string, password:string}): Observable<AuthModel | null> {
    return this.http.post<AuthModel | null>(`${environment.url}/auth/register`,
        {username:data?.username,password: data?.password});
  }
}

export interface AuthModel {
  username: string;
  password: string;
  role?: string;
  uuid?: string;
}
