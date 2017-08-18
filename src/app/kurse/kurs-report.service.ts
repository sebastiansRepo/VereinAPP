import {Injectable} from "@angular/core";
import {ServerService} from "../common/server.service";
import {LocalStorageService} from "../common/localStorage.service";
import {Report} from "../model/report.model";

@Injectable()
export class KursReportService {

  private BACKEND_URL : string = "";

  private DOMAIN_LOGIN_PATH : string = "/projectSportverein/rs/report";


  constructor(private serverService : ServerService,
              private localStorageService : LocalStorageService) {

  }

  public getReportForCourse(id : string) : Promise<Report> {

    this.BACKEND_URL = this.localStorageService.getBackendUrl();

    let url  : string = this.BACKEND_URL + this.DOMAIN_LOGIN_PATH + "/kurs/" + id;

    return this.serverService.getData<Report>(url);
  }

}
