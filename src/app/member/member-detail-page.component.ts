import {Component} from "@angular/core";
import {Mitglied} from "../model/mitglied.model";
import {NavParams} from "ionic-angular";

@Component({
  selector: 'member-detail-page',
  templateUrl: 'member-detail-page.component.html'
})
export class MemberDetailPageComponent {

  private member : Mitglied;

  private birthday : string;

  private exitDate : string;

  private pageTitle : string = '';

  constructor(private navParams : NavParams) {

    if (this.navParams.data.member) {
      this.member = this.navParams.data.member;

      this.pageTitle = this.member.vorname + ' ' + this.member.nachname;

      this.birthday = new Date(this.member.gebDatum).toISOString().split('T')[0];
      this.exitDate = new Date(this.member.trittAusDatum).toISOString().split('T')[0];

    } else {
      console.log("should not happen!");
    }

  }

}
