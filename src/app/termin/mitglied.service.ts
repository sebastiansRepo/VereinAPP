import {Injectable} from "@angular/core";
import {ServerService} from "../common/server.service";
import {Mitglied} from "../model/mitglied.model";
import {LocalStorageService} from "../common/localStorage.service";

@Injectable()
export class MitgliedService {

  private BACKEND_URL : string = "";

  private DOMAIN_LOGIN_PATH : string = "/projectSportverein/rs/mitglied";

  constructor(private serverService : ServerService,
              private localStorageService : LocalStorageService) {

  }

  public getMitglied(id : string) : Promise<Mitglied> {

    this.BACKEND_URL = this.localStorageService.getBackendUrl();

    let url  : string = this.BACKEND_URL + this.DOMAIN_LOGIN_PATH + "/" + id;

    return this.serverService.getData<Mitglied>(url);
  }



}
