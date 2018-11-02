import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { CZLogger } from '../../Utility/czlogger';

/**
 * Generated class for the BarCodeScanningPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bar-code-scanning',
  templateUrl: 'bar-code-scanning.html',
})
export class BarCodeScanningPage {

   isCompleted = false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private events :Events,
    private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BarCodeScanningPage');

    this.scanBarcode();
  }

  private scanBarcode() {

    this.barcodeScanner.scan().then(barcodeData => {

      if (this.isCompleted == true) { return; }
      this.isCompleted = true;

      CZLogger.log("BarCodeScanningPage.newCodeScanned " + JSON.stringify(barcodeData.text));
      this.events.publish("BarCodeScanningPage.newCodeScanned", barcodeData.text); 
      this.navCtrl.pop(); 
     }).catch(err => {

      if (this.isCompleted == true) { return; }
      this.isCompleted = true;
      
      this.events.publish("BarCodeScanningPage.newCodeScanned", null); 
      console.log('BarCodeScanningPage.Barcode.err', err); 
     });
  } 
}
