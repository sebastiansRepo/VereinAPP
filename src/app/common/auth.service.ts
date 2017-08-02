import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {LocalStorageService} from "./localStorage.service";
import {ServerService} from "./server.service";
import {AlertController} from "ionic-angular";

@Injectable()
export class AuthService{

  DomainLoginPath : string = "http://localhost:8080/projectSportverein/rs/login";

  constructor(private angularHttp : Http,
              private serverService : ServerService,
              private alertCtrl : AlertController,
              private localStorageService : LocalStorageService){
  }

  public signIn(username : string, password : string) : Promise<Response> {
    let url  : string = this.DomainLoginPath + "/auth";
    return this.serverService.postJSON(url, username, password);
  }

  public createAccount(username : string, password : string) : Promise<Response> {
    let url  : string = this.DomainLoginPath + "/register";
    return this.serverService.postJSON(url, username, password);
  }

  public logout() {
    this.localStorageService.resetData();
  }

  public updateLoginCredentials(username : string, password : string) : Promise<Response> {
    if(!this.isLoggedIn()) return null; //user is not logged in -> can´t change credentials
    return this.serverService.putJSON(this.DomainLoginPath + this.localStorageService.getUserId(), username, password);
  }

  public isLoggedIn() : Boolean {
    if(this.localStorageService.getUserId() == "-1") return false;
    return true;
  }

}
