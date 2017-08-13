import {Injectable} from "@angular/core";
import {LocalStorageService} from "./localStorage.service";
import {ServerService} from "./server.service";
import {Login} from "../login/login.model";

@Injectable()
export class AuthService{

  private DOMAIN_LOGIN_PATH : string = "http://localhost:8080/projectSportverein/rs/login";

  constructor(private serverService : ServerService,
              private localStorageService : LocalStorageService){
  }

  public signIn(login : Login)  {
    let url  : string = this.DOMAIN_LOGIN_PATH + "/auth";
    return this.serverService.postData(url, login);
  }

  public logout() {
    this.localStorageService.resetData();
  }

  // public updateLoginCredentials(newLogin : Login) : Promise<Response> {
  //   if(!this.isLoggedIn()) return null; //user is not logged in -> can´t change credentials
  //   return this.serverService.putData(this.DOMAIN_LOGIN_PATH + this.localStorageService.getUserId(), newLogin.username, newLogin.password);
  // }

  public isLoggedIn() : boolean {
    return !(this.localStorageService.getUserId() == "-1");
  }

}
