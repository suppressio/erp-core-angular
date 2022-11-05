import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { JsSignup, Login, Signup } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public login():Observable<Login>{
    return this.http.get<Login>(`${env.baseUrl}/login`,);
  }

  public logout(){
    
  }


  
  public signup(user_signup: JsSignup):Observable<Signup>{
    return this.http.post<Signup>(`${env.baseUrl}/signup`, { params:user_signup });
  }
}
