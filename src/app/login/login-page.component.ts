import {Component} from "@angular/core";
import {AlertController, NavController} from "ionic-angular";
import {AuthService} from "../common/auth.service";
import {LocalStorageService} from "../common/localStorage.service";
import {RegistryPageComponent} from "./registry-page.component";
import {ContentListPageComponent} from "../content/content-list-page.component";
import {Response} from "@angular/http";

@Component({
  selector:'login-page',
  templateUrl: 'login-page.component.html'
})
export class LoginPageComponent {

  private username : string;
  private password : string;
  private stayLoggedIn : boolean;

  constructor(private alertCtrl: AlertController,
              private navCtrl: NavController,
              private authService: AuthService,
              private localStorageService : LocalStorageService) {
  }

  ionViewWillEnter() {
    this.localStorageService.defaultInit(); // initializes the storage if first app start
    this.stayLoggedIn = this.localStorageService.getStayLoggedIn();

    //auto login
    if(this.stayLoggedIn && this.authService.isLoggedIn()) {
      this.navCtrl.push(ContentListPageComponent);
    }
  }

  public login() {
    this.authService.signIn(this.username, this.password)
      .then((httpResponse : Response) => {
        console.log(httpResponse);
        if(httpResponse.status == 200) {
          let parsedObject = httpResponse.json();
          this.localStorageService.setUsername(parsedObject.username);
          this.localStorageService.setPassword(parsedObject.password);
          this.localStorageService.setUserId(parsedObject.id);
          this.navCtrl.push(ContentListPageComponent);
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

  public createAccount() {
    this.navCtrl.push(RegistryPageComponent, {username: this.username, password: this.password});
  }

}
