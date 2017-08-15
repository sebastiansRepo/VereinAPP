import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {Termin} from "../model/termin.model";
import {BarcodeScanner, BarcodeScanResult} from "@ionic-native/barcode-scanner";
import {Kurs} from "../model/kurs.model";
import {Mitglied} from "../model/mitglied.model";
import {MitgliedService} from "./mitglied.service";
import {TerminService} from "./termin.service";

@Component({
  selector: 'termin-detail-page',
  templateUrl: 'termin-detail-page.component.html'
})
export class TerminDetailPageComponent {

  private termin : Termin;
  private kurs : Kurs;

  public greenMemberList : Mitglied[] = [];
  public redMemberList : Mitglied[] = [];
  public blackMemberList : Mitglied[] = [];

  private helpMemberList : Mitglied[] = [];

  //TODO - sollen vergangene Termine noch editierbar sein?!

  private pageTitle : string = '';

  constructor(private navParams : NavParams,
              private barcodeScanner: BarcodeScanner,
              private mitgliedService : MitgliedService,
              private terminService : TerminService) {

    if (this.navParams.data.termin && this.navParams.data.kurs) {
      this.termin = this.navParams.data.termin;
      this.kurs = this.navParams.data.kurs;

      //now set pageTitle
      this.pageTitle = this.kurs.name;

      //alle die erschienen sind, das kann beim 2 Seitenaufruf auch schon die enthalten, die gekommen sind, aber nicht angemeldet waren
      this.termin.mitgliederAnwesend.forEach( (member) => this.helpMemberList.push(member));

      this.assignLists();

    } else {
      console.log("Should not happen!");
    }

  }


  public startScan() : void {

    this.barcodeScanner.scan()
      .then(
        (barcodeData : BarcodeScanResult) => {

          //den MitgliedService auf Server-Seite habe ich schon gemacht!!!
          this.mitgliedService.getMitglied(barcodeData.text)
            .then((member : Mitglied) => {
              this.helpMemberList.push(member);

              //
              this.termin.mitgliederAnwesend = this.helpMemberList;

              //update termin on server-side!
              this.terminService.updateTermin(this.termin)
                .then((termin : Termin) => {
                //update termin reference
                this.termin = termin;

                this.assignLists();
                });
            })
            .catch((err) => {
              console.log(err);
            });
        },
        (err) => {
          console.log(err);
        });

  }

  private memberListDiff<T extends Mitglied>(a : T[], b : T[]) : T[] {

    let t : T[];

    if (b.length > a.length) {
      t = b;
      b = a;
      a = t;
    }

    return a.filter( (e1) => b.filter(e2 => e1.id === e2.id).length <= 0 );
  }

  private memberListIntersect<T extends Mitglied>(a : T[], b : T[]) : T[] {

    let t : T[];

    if (b.length > a.length) {
      t = b;
      b = a;
      a = t;
    }

    return a
      .filter( (e1) => b.filter( (e2) =>e1.id === e2.id).length > 0);
      // .filter( (e,i,c) => c.indexOf(e) === i );
  }

  private  arr_diff_not_in_a2<T extends Mitglied>(a : T[], b : T[]) : T[] {

    let diff : T[] = [];

    for (let i = 0; i < b.length; i++) {
      let found = false;

      for (let j = 0; j < a.length; j++) {
        if (a[j].id === b[i].id) {
          found = true;
        }
      }

      if (!found) {
        diff.push(b[i]);
      }
    }
    return diff;
  }

  private assignLists() : void {

    this.greenMemberList = this.memberListIntersect<Mitglied>(this.helpMemberList, this.kurs.mitgliederAngemeldet);

    this.redMemberList = this.memberListDiff<Mitglied>(this.greenMemberList, this.kurs.mitgliederAngemeldet);

    this.blackMemberList = this.arr_diff_not_in_a2<Mitglied>(this.kurs.mitgliederAngemeldet, this.helpMemberList);

  }




}
