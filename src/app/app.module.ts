import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { IonicApp } from 'ionic-angular';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { AuthGuard } from './shared/services/auth-guard.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { ChatModule } from './chat/chat.module';
import { SharedModule } from './shared/shared.module';
import { LoginPageComponent } from './shared/components/login-page/login-page.component';

export function resumeAccountSession(auth: AuthenticationService): () => Promise<any>  {
  return (): Promise<any> => auth.resumeSession();
}

@NgModule({
  declarations : [
    AppComponent,
    LoginPageComponent,
    PageNotFoundComponent,
  ],
  imports : [
    BrowserModule,
    SharedModule,
    ChatModule,
    AppRouting,
  ],
  providers : [
    AuthGuard,
    AuthenticationService,
    {
      provide : APP_INITIALIZER,
      useFactory : resumeAccountSession,
      multi : true,
      deps : [AuthenticationService]
    }],
  bootstrap : [IonicApp]
})
export class AppModule {
}
