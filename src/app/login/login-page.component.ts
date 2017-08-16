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

  private backendUrl : string = '';

  private login : Login;

  constructor(private alertCtrl: AlertController,
              private navCtrl: NavController,
              private authService: AuthService,
              private localStorageService : LocalStorageService) {

    //create empty Login-object
    this.login = new Login();

    //set backendUrl if it was already set
    this.backendUrl = localStorageService.getBackendUrl();
  }

  ionViewWillEnter() {
    this.localStorageService.defaultInit(); // initializes the storage if first app start

  }

  public signIn() {

    //now set BackendURL(If Client and Server not the Same-Device)
    if (this.backendUrl && this.backendUrl.length > 0) {

      this.localStorageService.setBackendUrl(this.backendUrl);

      this.authService.signIn(this.login)
        .then((login : Login) => {

          if (login) {

            this.localStorageService.setUsername(login.username);
            this.localStorageService.setPassword(login.password);
            this.localStorageService.setUserId(login.id);

            this.navCtrl.setRoot(KursListPageComponent, login.trainer);

          } else {
            console.log("should not happen!");
            console.log("No Login could be found!");
          }

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

    } else {
      let alert = this.alertCtrl.create({
        title: 'Please insert Backend URL',
        message: 'Please specify the Device where your Server Application is running',
        buttons: ['Dismiss']
      });
      alert.present();
    }



  }

}
