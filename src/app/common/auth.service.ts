import {Injectable} from "@angular/core";
import {LocalStorageService} from "./localStorage.service";
import {ServerService} from "./server.service";
import {Login} from "../model/login.model";

@Injectable()
export class AuthService{

  private BACKEND_URL : string = "";

  private DOMAIN_LOGIN_PATH : string = "/projectSportverein/rs/login";

  constructor(private serverService : ServerService,
              private localStorageService : LocalStorageService){

  }

  public signIn(login : Login)  {
    //TODO - es sollte normal seit dem Login nicht vorkommen, das die BackendURL leer ist, aber evtl nochmal abfangen!
    this.BACKEND_URL = this.localStorageService.getBackendUrl();

    let url  : string = this.BACKEND_URL + this.DOMAIN_LOGIN_PATH + "/auth";
    return this.serverService.postData<Login>(url, login);
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
