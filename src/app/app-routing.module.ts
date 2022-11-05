import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthenticationComponent } from './auth/auth.component';


export enum Paths{
  home='',
  login='login',
  demo='demo'
}

const routes: Routes = [
  { path: Paths.login, component: AuthenticationComponent },
  { path: Paths.home, component: LayoutComponent,
      loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: Paths.demo, component:LayoutComponent,
      loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule) },
  { path: '**', redirectTo: Paths.home },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


