import {Component} from "@angular/core";
import {AlertController, NavController, NavParams} from "ionic-angular";
import {AuthService} from "../common/auth.service";
import {LocalStorageService} from "../common/localStorage.service";
import {ContentListPageComponent} from "../content/content-list-page.component";
import {Response} from "@angular/http"

@Component({
  selector:'registry-page',
  templateUrl: 'registry-page.component.html'
})

export class RegistryPageComponent {

  private username : string;
  private password : string;
  private passwordConfirmation : string;
  private stayLoggedIn : boolean;

  constructor(private alertCtrl : AlertController,
              private authService : AuthService,
              private navParams : NavParams,
              private navCtrl : NavController, //used by loginCallback()
              private localStorageService : LocalStorageService) {

    if (this.navParams.data) {
      this.username = this.navParams.data.username;
      this.password = this.navParams.data.password;
    }
  }

  ionViewWillEnter() {
    this.stayLoggedIn = this.localStorageService.getStayLoggedIn();
  }

  public createAccount(){

    let inputErrors : string[] = [];

    if (!this.username || this.username.length <= 0) {
      inputErrors.push('Please insert a Username! <br/>');
    }

    if (!this.password || this.password.length <= 0) {
      inputErrors.push('Please insert a Password! <br/>');
    }

    if (!this.passwordConfirmation || this.passwordConfirmation.length <= 0) {
      inputErrors.push('You have to confirm your Password! <br/>');
    }

    if (this.password && this.passwordConfirmation && this.password.length > 0 && this.passwordConfirmation.length > 0) {
      if (this.password !== this.passwordConfirmation) {
        inputErrors.push('Your password inputs do not match! <br/>')
      }
    }

    if (inputErrors.length > 0) {  //inputErrors occured

      let alertMessage : string = inputErrors.reduce( (a,b) => a + b );

      let alert = this.alertCtrl.create({
        title: 'Input Errors occured',
        message: alertMessage,
        buttons: ['Dismiss']
      });

      alert.present();

    } else {
      this.authService.createAccount(this.username, this.password)
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
        });
      }
    }


}
