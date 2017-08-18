import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {AuthService} from "./common/auth.service";
import {LoginPageComponent} from "./login/login-page.component";
import {HttpModule} from "@angular/http";
import {LocalStorageService} from "./common/localStorage.service";
import {ServerService} from "./common/server.service";
import {KursListPageComponent} from "./kurse/kurs-list-page.component";
import {KursDetailPageComponent} from "./kurse/kurs-detail-page.component";
import {TerminDetailPageComponent} from "./termin/termin-detail-page.component";
import {MitgliedService} from "./termin/mitglied.service";
import {TerminService} from "./termin/termin.service";
import {MemberDetailPageComponent} from "./member/member-detail-page.component";
import {MemberListPageComponent} from "./member/member-list-page.component";
import {KursReportService} from "./kurse/kurs-report.service";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPageComponent,
    KursListPageComponent,
    KursDetailPageComponent,
    TerminDetailPageComponent,
    MemberDetailPageComponent,
    MemberListPageComponent
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
    KursListPageComponent,
    KursDetailPageComponent,
    TerminDetailPageComponent,
    MemberDetailPageComponent,
    MemberListPageComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    AuthService,
    LocalStorageService,
    ServerService,
    MitgliedService,
    TerminService,
    KursReportService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
