import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, EMPTY, map, Observable } from "rxjs";
import { SafeSubscriber } from "rxjs/internal/Subscriber";
import { Paths } from "src/app/app-routing.module";
import { AuthenticationService } from "./auth.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor{

  private subs = new SafeSubscriber();
  private ls_configs: string = '';

  constructor(private authService: AuthenticationService){
    var ls_token = localStorage.getItem("suppressio-config");
    if (ls_token)
      this.ls_configs = JSON.parse( ls_token );
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const r=this.addSid(req);
    if (r)
      req = req.clone(r);

    const res:Observable<any>  = next.handle(req).pipe(map((event: HttpEvent<any>) => event),
        catchError((err, caught: Observable<HttpEvent<any>>) => {
          this.authService.setErrorMsg(err.error);

          if (err.status) {
            switch (err.status) {
              case 0:
                this.authService.navigate(Paths.home);
                // this._snackBar.open("Impossibile comunicare con il server...", 'Ok', this.snackCfg);
                break;
              case 404:
                // this._snackBar.open('Errore, risorsa non disponibile. '+err.name+' - '+err.status, 'Ok', this.snackCfg);
                break;
              case 480:
                // this._snackBar.open('Errore, '+err.error, 'Ok', this.snackCfg);
                break;
              case 481 : //session expired
                // this._snackBar.open("Sessione scaduta...", 'Ok', this.snackCfg);
                this.authService.handleSessionLost();
                break;
              case 550 : // GENERIC
              case 551 : //  ERROR
                console.log('Avviso', err.statusText+' - '+err.error, err);
                // this._snackBar.open('Avviso: '+ err.statusText+' - '+err.error, 'Ok', this.snackCfg);
                break;
              default: {
                // this._snackBar.open('Errore, '+err.name+' - '+err.status, 'Ok', this.snackCfg);
              }
            }
            // this.checkSession();
            return EMPTY;
          }//FIXME: loop here ???
          return caught;
        })
      );

      return res;
  }

  // private checkSession(){
  //   if(this.authService.checkSession())
  //     this.subs.add(
  //       this.authService.checkSession().subscribe(
  //         (session) => console.debug("Session Check:", session),
  //         () => this.handleLogout()));
  //   else this.handleLogout();
  // }

  // private handleLogout(): void{
  //   this.authService.navigate(Paths.login);
  //   // this._snackBar.open('Sessione scaduta', 'Ok', this.snackCfg);
  // }

  private addSid(req:HttpRequest<any>){
    let sid = this.authService.getSid();
    if (sid)
      switch (req.method.toUpperCase()) {
        case 'GET':
          return { params: req.params.set('sid', sid) };
        case 'POST':
        default :
          return { body: { sid: this.authService.getSid(), ...req.body } };
      }

    return undefined;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
