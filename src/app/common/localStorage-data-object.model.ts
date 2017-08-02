export class LocalStorageDataObject {
  constructor(public stayLoggedIn : boolean, // value is related to checkbox in login-page.component.html or registry-page.component.html
              public username : string,
              public password : string,
              public userId : string,
              ){}
}
