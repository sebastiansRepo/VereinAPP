import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private barcodeScanner: BarcodeScanner) {

  }


  public scanTest() {
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      console.log(barcodeData);
    }, (err) => {
      // An error occurred
    });
  }

}
