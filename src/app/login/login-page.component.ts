import {Component} from "@angular/core";
import {AlertController, NavController} from "ionic-angular";
import {AuthService} from "../common/auth.service";

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
              private authService: AuthService) {
  }

  ionViewWillEnter() {
    //Subscribe User for Login-Logout Events
    /*
    let userSubscription = this.authService.getAuthStateObservable().subscribe(
        (user) => {
          //just watch if User is logged in for auto-login
          //if User is defined, go to TabsPage and unsubscribe here. We create new Subscription in Tabs-Page
          if (user) {
            userSubscription.unsubscribe();
            //this.navCtrl.push(TabsPage); TODO
          }
        }
      );
      */
  }

  public login() {
    let catchCallback = (error : any) => {
        if (error) {

          let code = error.code;
          let altertMessage = "";
          if (code === "auth/user-disabled") {
            altertMessage = 'Your account has been disabled';
          }

          if (code === "auth/invalid-email") {
            altertMessage = 'Not a valid E-Mail';
          }

          if (code === "auth/wrong-password") {
            altertMessage = 'Wrong password';
          }

          if (code === "auth/user-not-found") {
            altertMessage = 'There is no user corresponding to the given E-Mail'
          }
          let alert = this.alertCtrl.create({
            title: 'Something went wrong',
            message: altertMessage,
            buttons: ['Dismiss']
          });

          alert.present();
        }
    };

    //now call Service with given CB's
    //this.authService.signIn(this.username, this.password).catch(catchCallback);
  }

  public createAccount() {
    //this.navCtrl.push(RegistryPageComponent, {email: this.email, password: this.password}); TODO
  }

  public saveInLocalStorage() {

  }

}
