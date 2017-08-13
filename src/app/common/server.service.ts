import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";

@Injectable()
export class ServerService {

  private contentType : string = "application/json";

  constructor(private http : Http){
  }

  public postData<T>(url : string, data : T) : Promise<T> {

    //data should also be in JSON-Format, because of Typescript-Objects... maybe cast twice to make sure?!
    // let dataToSend : string  = JSON.parse(JSON.stringify(data));
    // console.log(dataToSend);

    //create Header to tell Server which Content-Type we commit
    let headers : Headers = new Headers();
    headers.append("Content-Type", this.contentType);


    return new Promise<T>( (resolve, reject) => {
      let tempSubscription = this.http.post(url, data, headers).subscribe(
        (res : Response) => {
          if (res) {
            //return Object to make function more general
            let result : T = res.json();
            resolve(result);
            //now unsubscribe
            tempSubscription.unsubscribe();
          }
          else {
            //tell Promise to call catch-Function, but also with the Server-response to catch the exact Error
            reject(res);
          }
        }
      );
    });

  }

  public putData(url : string, data : any) : Promise<Response> {

    let headers : Headers = new Headers();
    headers.append("Content-Type","application/json");


    return new Promise((resolve, reject) => {
      let subscription = this.http.put(url, data, headers).subscribe(
        (response : Response) => {
          if(response) {
            resolve(response);
            subscription.unsubscribe();
          } else {
            reject(response);
          }
        }
      )
    });
  }


}
