import {Injectable} from "@angular/core";
import {Headers, Http, RequestMethod, RequestOptionsArgs, Response} from "@angular/http";
import {LocalStorageService} from "./localStorage.service";

@Injectable()
export class ServerService{

  constructor(private angularHttp : Http,
              private localStorageService : LocalStorageService){
  }

  public postJSON(url : string, username : string, password : string) {
    let body : any = JSON.parse("{ " +
      "\"username\" : \"" + username + "\", " +
      "\"password\" : \"" + password + "\"" +
      "}");
    let headers : Headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.doPost(url, body, headers);
  }

  //to prevent redundant code
  private doPost(url : string, body : any, headers : Headers) : Promise<Response> {
    return new Promise((resolve, reject) => {
      let subscription = this.angularHttp.post(url, body, headers).subscribe(
        (response : Response) => {
          if(response) {
            resolve(response);
            subscription.unsubscribe(); // NOT an unreachable statement
          } else {
            reject(response);
          }
        }
      )
    });
  }

  public putJSON(url : string, username : string, password : string) : Promise<Response> {
    let body : any = JSON.parse("{ " +
      "\"username\" : \"" + username + "\", " +
      "\"password\" : \"" + password + "\"" +
      "}");
    let headers : Headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.doPut(url, body, headers);
  }

  private doPut(url : string, body : any, headers : Headers) : Promise<Response> {
    return new Promise((resolve, reject) => {
      let subscription = this.angularHttp.put(url, body, headers).subscribe(
        (response : Response) => {
          if(response) {
            resolve(response);
            subscription.unsubscribe(); // NOT an unreachable statement
          } else {
            reject(response);
          }
        }
      )
    });
  }

}
