import {Component, ViewChild} from "@angular/core";
import {Trainer} from "../model/trainer.model";
import {AlertController, NavController, NavParams, Searchbar} from "ionic-angular";
import {Kurs} from "../model/kurs.model";
import {KursDetailPageComponent} from "./kurs-detail-page.component";
import {MemberListPageComponent} from "../member/member-list-page.component";
import {KursReportService} from "./kurs-report.service";
import {Report} from "../model/report.model";

@Component({
  selector:'kurs-list-page',
  templateUrl: 'kurs-list-page.component.html'
})
// git repo init comment
export class KursListPageComponent {

  private trainer : Trainer;

  @ViewChild(Searchbar)
  private searchbar : Searchbar;

  private searchQuery : string = '';

  private showSearchbar : boolean = false;

  private allKurse : Kurs[] = [];
  private filteredKurse : Kurs[] = [];

  constructor(private navParams : NavParams,
              private navCtrl : NavController,
              private alertCtrl : AlertController,
              private reportService : KursReportService) {

    if (this.navParams.data.id){
      this.trainer = this.navParams.data;

      //now assign Kurse (first sort them)
      this.allKurse = this.trainer.kurse;

      this.sortByName(this.allKurse);
      this.filteredKurse = this.allKurse;

    } else  {
      console.log("should not happen!");
    }

  }

  public setShowSearchbar(showSearchbar : boolean) : void {
    this.showSearchbar = showSearchbar;

    //set Focus to searchbar
    if (this.showSearchbar) {
      setTimeout(() => {this.searchbar.setFocus()}, 300);
    }

  }

  public doSearch() : void {

    //only search by name

    this.filteredKurse = this.allKurse.filter( (kurs) => kurs.name.toLowerCase().includes(this.searchQuery.toLowerCase()) );

    //sort that array again
    this.sortByName(this.filteredKurse);
  }

  public clearSearchbar() : void {

    this.searchQuery = '';
    this.filteredKurse = this.allKurse;

  }

  private sortByName(kurse : Kurs[]) : void {
    kurse.sort( (k1,k2) => {
      if (k1.name < k2.name) {
        return -1;
      }
      if (k1.name > k2.name) {
        return 1;
      }
      return 0;
    } );

  }

  public showKursDetails(kurs : Kurs) : void {

    this.navCtrl.push(KursDetailPageComponent, kurs);

  }

  public showCourseStats(id : string) : void {

    this.reportService.getReportForCourse(id).then( (report : Report) => {
      if (report) {
        let alert = this.alertCtrl.create({
          title: 'Course Statistics',
          message:  report.content,
          buttons: ['Dismiss']
        });

        alert.present();
      }
    });
  }

  public showMemberList(kurs : Kurs) : void {

    this.navCtrl.push(MemberListPageComponent, {memberList : kurs.mitgliederAngemeldet});
  }

}
