import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Kurs} from "../model/kurs.model";
import {Termin} from "../model/termin.model";
import {TerminDetailPageComponent} from "../termin/termin-detail-page.component";

@Component({
  selector: 'kurs-detail-page',
  templateUrl: 'kurs-detail-page.component.html'
})
export class KursDetailPageComponent {

  private kurs : Kurs;

  private pageTitle : string = '';

  constructor(private navParams : NavParams,
              private navCtrl : NavController) {
    if (this.navParams.data.id) {
      this.kurs = this.navParams.data;

      //now set pageTitle
      this.pageTitle = this.kurs.name + ' dates';

    } else {
      console.log("Should not happen!");
    }
  }

  public showTerminDetails(termin : Termin) : void {
    this.navCtrl.push(TerminDetailPageComponent, {termin: termin, kurs: this.kurs});
  }



}
