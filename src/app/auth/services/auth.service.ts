import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Paths } from 'src/app/app-routing.module';
import { environment as env } from 'src/environments/environment';
import { JsSignup, Login, Signup } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private sid: string|undefined;
  private errorSubj =  new BehaviorSubject<string>('');
  authChange$ = new Subject();


  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.recoverSid();
  }

  
  public signup(user_signup: JsSignup):Observable<Signup>{
    return this.http.post<Signup>(`${env.baseUrl}/signup`, user_signup);
  }


  public getUser():string|undefined{
    if ('supp-user' in localStorage){
      const userInfo = JSON.parse(localStorage['supp-user']);
      return userInfo['user'];
    }
    return undefined;
  }


  private recoverSid():void{
    if ('supp-user' in localStorage)
      try {
        const userInfo = JSON.parse(localStorage['supp-user']);
        this.sid = userInfo['sid'];
        console.debug('Found existing session:', this.sid);
      } catch(ex) {
        console.error('Exception while reading session information', ex);
      }
    // else
    //   this.router.navigate([Paths.login]);
  }

  public getSid():string|undefined{
    return this.sid;
  }


  public login(user:string, password:string):Observable<Login>{
    return this.http.get<Login>(`${env.baseUrl}/login`,);
  }

  // public login(user:string, password:string): Observable<{sid: string}> {
  //   const url = `${env.baseUrl}/login`;
  //   const data = {user, password};

  //   return this.http.post(url, data).pipe(
  //     tap((resp: {sid: string}) => {

  //       if (!('avvuser' in localStorage))
  //         localStorage.setItem('avvuser', JSON.stringify(resp));
  //       else {
  //         localStorage.removeItem('avvuser');
  //         localStorage.setItem('avvuser', JSON.stringify(resp));
  //       }
  //       this.sid = resp.sid;

  //       this.authChange$.next();
  //     })
  //   );
  // }

  public setErrorMsg(error: string){
    this.errorSubj.next(error);
  }

  public getError(): Observable<string>{
    return this.errorSubj.asObservable();
  }

  logout() {
    this.sid = '';
    this.errorSubj.next('');
    delete localStorage['avvuser'];
    this.router.navigate([Paths.login]);
  }

  // public checkSession():Observable<Object> | null{
  //   if (!this.sid) {
  //     this.router.navigate([Paths.login]);
  //     return null;
  //   }
  //   const url = `${env.baseUrl}/Avv/rest/access/checksid`;
  //   const data = {sid: this.sid};
  //   return this.http.post(url, data);
  // }

  handleSessionLost() {
    this.logout();
  }


  navigate(link:Paths){
    this.router.navigate([link]);
  }
}


