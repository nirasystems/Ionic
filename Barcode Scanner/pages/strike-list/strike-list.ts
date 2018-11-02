import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { AppLoginPage } from '../app-login/app-login';
import { StrikeDetailPage } from '../strike-detail/strike-detail';
import { StrikeProvider } from '../../providers/strike/strike';
import { IStrike } from '../../models/strike';
import { CZLogger } from '../../Utility/czlogger';


/**
 * Generated class for the StrikeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-strike-list',
  templateUrl: 'strike-list.html',
})
export class StrikeListPage {

  viewModels :StrikeListPageViewModel[];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private strikeProvider :StrikeProvider, 
     private loadingCtrlr: LoadingController,
     private alertCtrl: AlertController,
     private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad StrikeListPage');

    this._loadStrikes();
  } 


  logoutButtonTapped() {

    this._presentConfirm('Confirm', 'Confirm logout?', "YES", "Cancel", isConfirmed =>  {

    if (isConfirmed == false) { return; } 
     
        this.navCtrl.setRoot(AppLoginPage);
    }); 
  }

 strikeListItemButtonTapped(idx) {
 
     if (idx == undefined || idx == null) { return; }
     if (this.viewModels.length <= idx) { return; }

     let strike = this.viewModels[idx].strike 

     this.navCtrl.push(StrikeDetailPage, {
      strike: strike, 
    });  
  } 

  private _loadStrikes() {

    let loading = this.loadingCtrlr.create({spinner: 'hide', content: 'Loading Please Wait...' });
    loading.present();
    
    this.strikeProvider.getList().then(list => {

      CZLogger.log("StrikeListPage._loadStrikes.list" + JSON.stringify(list));
      loading.dismiss();
      this._updateStrikeList(list); 
      
    }).catch(err => {

      CZLogger.log("StrikeListPage._loadStrikes.err" + JSON.stringify(err));
      loading.dismiss(); 
      let toast = this.toastCtrl.create({message: err, duration: 3000, position: 'bottom' }); 
      toast.present();
    });
  }

  private _updateStrikeList(list :[IStrike]) {

       let viewModels = new Array<StrikeListPageViewModel>();

       for (let strike of list) { 
         
        let n = strike.Title;  
        let d = strike.StartDate;  

         if ((n != undefined && n != null) && (d != undefined && d != null)) {

            viewModels.push(new StrikeListPageViewModel(strike)); 
         } 
       }  

       this.viewModels = viewModels;
  }  

  private _presentConfirm(title :string, message: string, ok: string, cancel: string,callback: (flag :Boolean) => void) {

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

class StrikeListPageViewModel {

  name :string = "";
  date :string = "";

  constructor(public strike: IStrike) {
 
    this.name = strike.Title;

    try {
 
      let str = this._formattedDateString(strike.StartDate);
      this.date = "Start Date : " + str;
      
    } catch (error) {
      
      CZLogger.log("StrikeListPageViewModel.error" + JSON.stringify(error));
    } 
 } 

private _formattedDateString(d) {
  
    if (d == undefined) { return null; }
 
    if (d == null) { return null; } 
    let newDate = new Date(Date.parse(d)); 
   
    return newDate.toDateString();
 }
}
