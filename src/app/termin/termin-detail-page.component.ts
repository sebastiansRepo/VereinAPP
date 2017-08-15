import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {Termin} from "../model/termin.model";
import {BarcodeScanner, BarcodeScanResult} from "@ionic-native/barcode-scanner";
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
        (barcodeData : BarcodeScanResult) => {

          //TODO - hier müssen die Mitglieder ergäzt werden, die dann auch wirklich anwesen waren....

          //In barcodeData.text steht die eingescannte ID, also bspw 1
          //d.h. es muss entweder auf Client-Seite die Liste aller angemeldeten Mitglieder durchgelaufen werden und dann entsprechend auf anwesend gesetzt werden,
          //oder es muss auf Server-Seite einen Service geben, der Mitglieder anhand der ID zurück gibt und dann in die Liste mitgliederanwesend ergänzt.
          //wäre vorteilhaft, wenn bspw auch unangemeldete Mitglieder teilnehmen können!!!


          //den MitgliedService auf Server-Seite habe ich schon gemacht!!!

        },
        (err) => {
          console.log(err);
        });

  }

}
