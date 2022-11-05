import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationModule } from './auth/auth.module';
import { UserBadgeComponent } from './layout/user-badge/user-badge.component';
import { LoadingOverlayComponent } from './layout/loading-overlay/loading-overlay.component';
import { LoadingService } from './layout/services/loading.service';
import { AuthenticationInterceptor } from './auth/services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    UserBadgeComponent,
    LoadingOverlayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    AuthenticationModule
  ],
  providers: [
    LoadingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
  // {
  //   provide: APP_INITIALIZER,
  //   deps: [ ConfigsService ],
  //   useFactory: ( configsService: ConfigsService ) => () => configsService.loadConfigs(),
  //   multi: true
  // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
