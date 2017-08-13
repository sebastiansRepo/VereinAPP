import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {AuthService} from "./common/auth.service";
import {SubscriptionService} from "./common/subscription.service";
import {LoginPageComponent} from "./login/login-page.component";
import {HttpModule} from "@angular/http";
import {LocalStorageService} from "./common/localStorage.service";
import {ServerService} from "./common/server.service";
import {ContentListPageComponent} from "./content/content-list-page.component";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPageComponent,
    ContentListPageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPageComponent,
    ContentListPageComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    AuthService,
    SubscriptionService,
    LocalStorageService,
    ServerService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
