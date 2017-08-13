import {Component} from "@angular/core";
import {AlertController, NavController} from "ionic-angular";
import {AuthService} from "../common/auth.service";
import {LocalStorageService} from "../common/localStorage.service";
import {KursListPageComponent} from "../kurse/kurs-list-page.component";
import {Login} from "../model/login.model";

@Component({
  selector:'login-page',
  templateUrl: 'login-page.component.html'
})
export class LoginPageComponent {

  private stayLoggedIn : boolean;

  private login : Login;

  constructor(private alertCtrl: AlertController,
              private navCtrl: NavController,
              private authService: AuthService,
              private localStorageService : LocalStorageService) {

    //create empty Login-object
    this.login = new Login();
  }

  ionViewWillEnter() {
    this.localStorageService.defaultInit(); // initializes the storage if first app start
    this.stayLoggedIn = this.localStorageService.getStayLoggedIn();

    //auto login
    if(this.stayLoggedIn && this.authService.isLoggedIn()) {
      this.navCtrl.setRoot(KursListPageComponent);
    }
  }

  public signIn() {
    this.authService.signIn(this.login)
      .then((login : Login) => {
        this.localStorageService.setUsername(login.username);
        this.localStorageService.setPassword(login.password);
        this.localStorageService.setUserId(login.id);
        this.navCtrl.setRoot(KursListPageComponent, login.trainer);
      })
      .catch((error) => {
        console.log(error);
        let alert = this.alertCtrl.create({
          title: 'Something went wrong',
          message: 'Connection error',
          buttons: ['Dismiss']
        });

        alert.present();
      });
  }

}
