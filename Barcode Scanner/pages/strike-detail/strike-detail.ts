
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { StrikeSignInPage } from '../strike-sign-in/strike-sign-in';
import { StrikeSignOutPage } from '../strike-sign-out/strike-sign-out';
import { IStrike } from '../../models/strike';
import { IPicketLine } from '../../models/picket-line';
import { PicketLineProvider } from '../../providers/picket-line/picket-line';
import { CZLogger } from '../../Utility/czlogger';
import { AppLoginPage } from '../app-login/app-login';

@IonicPage()
@Component({
  selector: 'page-strike-detail',
  templateUrl: 'strike-detail.html',
})
export class StrikeDetailPage {

  viewModels: StrikeDetailPageViewModel[];
  strike: IStrike;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private picketLineProvider: PicketLineProvider,
    private loadingCtrlr: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {

    this.strike = navParams.get('strike');
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad StrikeDetailPage');
    this._loadPicketLines();
  }

  strikeSignInButtonTapped(idx) {

    if (idx == undefined || idx == null) { return; }
    if (this.viewModels.length <= idx) { return; }

    let picket = this.viewModels[idx].picket

    this.navCtrl.push(StrikeSignInPage, {
      picket: picket,
    });
  }

  strikeSignOutButtonTapped(idx) {

    this.navCtrl.push(StrikeSignOutPage);
  }


  logoutButtonTapped() {

    this._presentConfirm('Confirm', 'Confirm logout?', "YES", "Cancel", isConfirmed => {

      if (isConfirmed == false) { return; }

      this.navCtrl.setRoot(AppLoginPage);
    });
  }

  private _loadPicketLines() {

    if (this.strike == undefined || this.strike == null || this.strike.ID == undefined || this.strike.ID == null) { return; }


    let loading = this.loadingCtrlr.create({ spinner: 'hide', content: 'Loading Please Wait...' });
    loading.present();

    this.picketLineProvider.getList(this.strike.ID).then(list => {

      CZLogger.log("StrikeDetailPage._loadPicketLines.list" + JSON.stringify(list));
      loading.dismiss();
      this._updatePicketLine(list);

    }).catch(err => {

      CZLogger.log("StrikeDetailPage._loadPicketLines.err" + JSON.stringify(err));
      loading.dismiss();
      let toast = this.toastCtrl.create({ message: err, duration: 3000, position: 'bottom' });
      toast.present();
    });
  }

  private _updatePicketLine(list: [IPicketLine]) {

    let viewModels = new Array<StrikeDetailPageViewModel>();

    for (let picket of list) {

      let n = picket.PicketLineName;

      if ((n != undefined && n != null)) {

        viewModels.push(new StrikeDetailPageViewModel(picket));
      }
    }

    this.viewModels = viewModels;
  }

  private _presentConfirm(title: string, message: string, ok: string, cancel: string, callback: (flag: Boolean) => void) {

    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: cancel,
          role: 'cancel',
          handler: () => {
            callback(false);
          }
        },
        {
          text: ok,
          handler: () => {
            callback(true);
          }
        }
      ]
    });
    alert.present();
  }
}

class StrikeDetailPageViewModel {

  name: string = "";

  constructor(public picket: IPicketLine) {

    this.name = picket.PicketLineName;
  }
}