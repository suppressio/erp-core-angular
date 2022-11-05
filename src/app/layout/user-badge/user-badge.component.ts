import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-user-badge',
  templateUrl: './user-badge.component.html',
  styleUrls: ['./user-badge.component.scss']
})
export class UserBadgeComponent {
  user:string|undefined;
  logoutVisibility = false;
  timeOutIDs:any[] = [];

  constructor(
      private auth: AuthenticationService
    ) { }

  hideLogout(){
    this.timeOutIDs.push( setTimeout(()=>this.logoutVisibility = false, 400) );
  }

  showLogout(){
    this.timeOutIDs.forEach(id => clearTimeout(id));
    this.user=this.auth.getUser();
    this.logoutVisibility = true;
  }

  logout(){
    this.auth.logout();
  }

}
