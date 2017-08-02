import {Injectable} from "@angular/core";
import {LocalStorageDataObject} from "./localStorage-data-object.model";

@Injectable()
export class LocalStorageService {

  constructor() {}

  storageKey : string = "key";

  public defaultInit() : void {
    if(localStorage.getItem(this.storageKey) === null) {
      this.resetData();
    }
  }

  public resetData() : void {
    let defaultObject : LocalStorageDataObject = new LocalStorageDataObject(false,"","","-1");
    this.storeAll(defaultObject);
  }

  public getAll() : LocalStorageDataObject {
    return JSON.parse(localStorage.getItem(this.storageKey))
  }

  public storeAll(localStorageDataObject : LocalStorageDataObject) : void {
    localStorage.setItem(this.storageKey, JSON.stringify(localStorageDataObject));
  }

  //-------------------- getters and setters --------------------//

  public getStayLoggedIn() : boolean {
    return this.getAll().stayLoggedIn;
  }

  public setStayLoggedIn(newStayLoggedIn) : void {
    let storedData : LocalStorageDataObject = this.getAll();
    storedData.stayLoggedIn = newStayLoggedIn;
    this.storeAll(storedData);
  }

  public getUsername() : string {
    return this.getAll().username;
  }

  public setUsername(username) : void {
    let storedData : LocalStorageDataObject = this.getAll();
    storedData.username = username;
    this.storeAll(storedData);
  }

  public getPassword() : string {
    return this.getAll().password;
  }

  public setPassword(password) : void {
    let storedData : LocalStorageDataObject = this.getAll();
    storedData.password = password;
    this.storeAll(storedData);
  }

  public getUserId() : string {
    return this.getAll().userId;
  }

  public setUserId(userId) : void {
    let storedData : LocalStorageDataObject = this.getAll();
    storedData.userId = userId;
    this.storeAll(storedData);
  }

}
