import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {Termin} from "../model/termin.model";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {Kurs} from "../model/kurs.model";

@Component({
  selector: 'termin-detail-page',
  templateUrl: 'termin-detail-page.component.html'
})
export class TerminDetailPageComponent {

  private termin : Termin;
  private kurs : Kurs;

  private pageTitle : string = '';

  constructor(private navParams : NavParams,
              private barcodeScanner: BarcodeScanner) {

    if (this.navParams.data.termin && this.navParams.data.kurs) {
      this.termin = this.navParams.data.termin;
      this.kurs = this.navParams.data.kurs;

      //now set pageTitle
      //TODO - siehe unten
      this.pageTitle = 'Hier muss noch was mit dem Datum passieren'; //this.termin.datum.toDateString();

    } else {
      console.log("Should not happen!");
    }

  }


  public startScan() : void {

    this.barcodeScanner.scan()
      .then(
        (barcodeData) => {

          //TODO - hier müssen die Mitglieder ergäzt werden, die dann auch wirklich anwesen waren....
          console.log(barcodeData);
          alert(barcodeData);
        },
        (err) => {
          console.log(err);
        });

  }

}
