import {Component} from "@angular/core";
import {AlertController, NavController} from "ionic-angular";
import {AuthService} from "../common/auth.service";
import {LocalStorageService} from "../common/localStorage.service";
import {ContentListPageComponent} from "../content/content-list-page.component";
import {Response} from "@angular/http";
import {Login} from "./login.model";

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
      this.navCtrl.setRoot(ContentListPageComponent);
    }
  }

  public signIn() {
    this.authService.signIn(this.login)
      .then((httpResponse : Response) => {
        console.log(httpResponse);
        if(httpResponse.status == 200) {

          //TODO - hier das Obekt in Login umwandeln, damit Typisiert gearbeitet werden kann
          let parsedObject = httpResponse.json();
          this.localStorageService.setUsername(parsedObject.username);
          this.localStorageService.setPassword(parsedObject.password);
          this.localStorageService.setUserId(parsedObject.id);
          this.navCtrl.setRoot(ContentListPageComponent);

        } else {
          let alert = this.alertCtrl.create({
            title: 'Something went wrong',
            message: 'The server seems to be not ready',
            buttons: ['Dismiss']
          });
          alert.present();
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
  }

}
