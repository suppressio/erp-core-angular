import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Paths } from 'src/app/app-routing.module';
import { AuthenticationService } from './services/auth.service';
import { SafeSubscriber } from 'rxjs/internal/Subscriber';

@Component({
  selector: 'app-authentication',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  private subs = new SafeSubscriber();

  form: FormGroup;
  loading:boolean = false;
  loginError:string|undefined = undefined;
  showPassword: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = fb.group({
      user: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loading = false;
  }

  validForm(){
    return this.form.valid;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  doLogin() {
    this.loading = true;
    const val = this.form.value;
    this.subs.add(
      this.authService.getError().subscribe(
        (msg) => this.loginError = msg
      ));

    this.subs.add(
      this.authService.login(val.user, val.pass).subscribe(
        (result) => {
          console.debug('auth success!!!', result);
          this._snackBar.open('Login effettuato...', 'Ok', {duration: 5000});
          this.router.navigate([Paths.home]);
          //this.close(result);
        },
        (error) => {
          this._snackBar.open('Errore login: '+error, 'Ok', {duration: 5000});
          this.loginError = error;
        },
        () => this.loading = false));
  }

//close(retval) { this.dialogRef.close(retval); }

  ngOnDestroy(): void {
    this.authService.setErrorMsg('');
    this.subs.unsubscribe();
  }
}
