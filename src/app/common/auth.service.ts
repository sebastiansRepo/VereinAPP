import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

/**
 * Created by Sebastian on 26.06.2017.
 */
@Injectable()
export class AuthService{

  userId : string = "-1";

  constructor(private angularHttp : Http){
  }

  public signIn(username : string, password : string) : Observable<Response> {
    let url  : string = "http://localhost:8080/projectSportverein/rs/login/auth";
    let body : any =
      "{ " +
        "\"username\" : \"" + username + "\", " +
        "\"password\" : \"" + password + "\"" +
      "}";
    return this.angularHttp.post(url, body);
  }

  public createAccount(username : string, password : string) : Observable<Response> {
    let url  : string = "http://localhost:8080/projectSportverein/rs/login/register";
    let body : any =
      "{ " +
        "\"username\" : \"" + username + "\", " +
        "\"password\" : \"" + password + "\"" +
      "}";
    return this.angularHttp.post(url, body);
  }


  public logout() {
    this.userId = "-1";

  }

  public updateLoginCredentials(newUsername : string, newPassword : string) : Observable<Response> {
    if(!this.checkIfLoggedIn()) return null; //user is not logged in -> can´t change credentials
    let url  : string = "http://localhost:8080/projectSportverein/rs/login/" + this.userId;
    let body : any =
      "{ " +
        "\"username\" : \"" + newUsername + "\", " +
        "\"password\" : \"" + newPassword + "\"" +
      "}";
    return this.angularHttp.put(url, body);
  }

  /*
  public getCurrentUser() : Observable<Response>  {

  }*/

  /*
  public getAuthStateObservable() : Observable<Response> {

  }*/

  private checkIfLoggedIn() : Boolean {
    if(this.userId == "-1") return false;
    return true;
  }

}
