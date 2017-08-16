import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Mitglied} from "../model/mitglied.model";
import {MemberDetailPageComponent} from "./member-detail-page.component";

@Component({
  selector: 'member-list-page',
  templateUrl: 'member-list-page.component.html'
})
export class MemberListPageComponent {

  private memberList : Mitglied[] = [];

  constructor(private navParams : NavParams,
              private navCtrl : NavController) {

    if (this.navParams.data.memberList) {
      this.memberList = this.navParams.data.memberList;

      this.sortByNachname(this.memberList);
    } else {
      console.log("should not happen!");
    }

  }

  private sortByNachname(memberList : Mitglied[]) : void {

    memberList.sort( (m1,m2) => {
      if (m1.nachname < m2.nachname) {
        return -1;
      }
      if (m1.nachname > m2.nachname) {
        return 1;
      }
      return 0;
    });

  }

  public showMemberDetails(member : Mitglied) : void {
    this.navCtrl.push(MemberDetailPageComponent, {member: member});
  }



}
