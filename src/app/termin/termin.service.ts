import {Injectable} from "@angular/core";
import {ServerService} from "../common/server.service";
import {LocalStorageService} from "../common/localStorage.service";
import {Termin} from "../model/termin.model";

@Injectable()
export class TerminService {

  private BACKEND_URL : string = "";

  private DOMAIN_LOGIN_PATH : string = "/projectSportverein/rs/termin";

  constructor(private serverService : ServerService,
              private localStorageService : LocalStorageService) {

  }

  public updateTermin(termin : Termin) : Promise<Termin> {

    this.BACKEND_URL = this.localStorageService.getBackendUrl();

    let url  : string = this.BACKEND_URL + this.DOMAIN_LOGIN_PATH + "/";

    return this.serverService.postData<Termin>(url, termin);
  }

}
