

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, Events } from 'ionic-angular';
import { IPicketLine } from '../../models/picket-line';
import { PicketLineProvider } from '../../providers/picket-line/picket-line';
import { CZLogger } from '../../Utility/czlogger';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { StrikeSignInSignOutProvider } from '../../providers/strike-sign-in-sign-out/strike-sign-in-sign-out';
import { SignInRequest } from '../../models/last-sign-in';
import { SignInRequestValidator } from '../../validators/sign-in-request-validator';
import { SignInDataSet, SignInData, LastSignInData } from '../../models/last-sign-in-result';
import { StrikeSignIn } from '../../models/strike-sign-in';
import { AppLoginPage } from '../app-login/app-login';
import { BarCodeScanningPage } from '../bar-code-scanning/bar-code-scanning';

/**
 * Generated class for the StrikeSignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-strike-sign-in',
  templateUrl: 'strike-sign-in.html',
})
export class StrikeSignInPage {

  title :string = ""; 
  isSignInTabSelected :Boolean = true; 

  request = new SignInRequest();

  scanCardViewModel = new ScanCardViewModel();
  signInCardViewModel = new SignInCardViewModel(); 
  alreadySignInCardViewModel = new AlreadySignInCardViewModel();
  signedInListviewModels :StrikeSignInListViewModel[];

  signOutCardViewModel = new SignOutCardViewModel(); 
  notyetSignedInViewModel = new NotyetSignedInViewModel();
  signedOutListviewModels :StrikeSignInListViewModel[];
  

  bottomViewModelList :StrikeSignInListViewModel[];
   
  signInDataSet :SignInDataSet;
  picket: IPicketLine;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private strikeSignInSignOutProvider :StrikeSignInSignOutProvider, 
     private loadingCtrlr: LoadingController,
     private alertCtrl: AlertController,
     private toastCtrl: ToastController,
     private events :Events ) {
  
      this.picket = navParams.get('picket');

      if (this.picket != undefined || this.picket != null) {
        if (this.picket.PicketLineName != undefined || this.picket.PicketLineName != null) {
          this.title = this.picket.PicketLineName + " SignIn";
        }
      }
       
      CZLogger.log("StrikeSignInPage.picket : "+ JSON.stringify(this.picket))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StrikeSignInPage');

    this.scanCardViewModel.setTitle("Scan your card for Sign-in");
    this.isSignInTabSelected = true;  
  }

  ionViewWillUnload() {
    
    this.alreadySignInCardViewModel.flush();
    this.signInCardViewModel.flush();
    this.signOutCardViewModel.flush();
    this.notyetSignedInViewModel.flush();
    
    this._removeObservers();
   }

  scanButtonTapped() {

    this._removeObservers();
    this._addObservvers();

    this.navCtrl.push(BarCodeScanningPage); 
  }

  logoutButtonTapped() {

    this._presentConfirm('Confirm', 'Confirm logout?', "YES", "Cancel", isConfirmed =>  {

    if (isConfirmed == false) { return; } 
     
        this.ionViewWillUnload();
        this.navCtrl.setRoot(AppLoginPage);
    }); 
  }

  signInTabTapped() {

    this.request.memberId = null; 
    this.isSignInTabSelected = true; 
   
    this.scanCardViewModel.setTitle("Scan your card for Sign-in");
    this._reset();
  }

  signOutTabTapped() {
  
    this.request.memberId = null; 
    this.isSignInTabSelected = false;
     
    this.scanCardViewModel.setTitle("Scan your card for Sign-Out");

    this._reset();
  }
 

  searchButtonTapped() {
 
    this._reset();
    this._getSignInStatus();   
  }
 
  signInButtonTapped() {
  
    let signIn = {};
    let date = new Date(); 

    if (this.signInDataSet.signInData == undefined) { return; }
    if (this.signInDataSet.signInData == null) { return; }

    signIn['StrikeInfoId'] = ""+this.signInDataSet.signInData.StrikeInfoId;
    signIn['StrikeMemberId'] =  this.signInDataSet.signInData.ID;
    signIn['StrikePicketlineId'] = ""+this.picket.ID;
    signIn['WalkDate'] = date.toDateString();
    signIn['SignInTime'] = date.toDateString();   
    signIn['SignInLocalTime'] = date.toLocaleTimeString();
    signIn['SignInMethod'] = "ID Card Scanned";  

    let loading = this.loadingCtrlr.create({spinner: 'hide', content: 'Loading Please Wait...' });
    loading.present();
 
    this.strikeSignInSignOutProvider.strikeSignIn(this.request, <StrikeSignIn> signIn).then(result => {
 
      loading.dismiss();

      this.signInCardViewModel = new SignInCardViewModel();
      this.alreadySignInCardViewModel = new AlreadySignInCardViewModel();
 
      CZLogger.log("StrikeSignInPage.signInButtonTapped.signIn : "+JSON.stringify(signIn));
    }).catch(err => {

      loading.dismiss();
      
      let toast = this.toastCtrl.create({message: err, duration: 3000, position: 'bottom' }); 
      toast.present(); 
    });
  }

  signOutButtonTapped() {

    let signOut = {};
    let date = new Date(); 
    signOut = this.signInDataSet.lastSignInData;

    if (signOut == undefined) { return; }
    if (signOut == null) { return; }

    signOut['SignOutTime'] =  date.toDateString(); 
    signOut['SignInMethod'] = "D Card Scanned"; 
    signOut['SignOutMethod'] = "D Card Scanned"; 
    signOut['SignOutLocalTime'] = date.toLocaleTimeString(); 
      
    let loading = this.loadingCtrlr.create({spinner: 'hide', content: 'Loading Please Wait...' });
    loading.present();
 
    this.strikeSignInSignOutProvider.strikeSignOut(this.request, signOut).then(result => {
  
      loading.dismiss(); 

      this.signOutCardViewModel = new SignOutCardViewModel();
      this.notyetSignedInViewModel = new NotyetSignedInViewModel();
 
      CZLogger.log("StrikeSignInPage.signOutButtonTapped.signIn : "+JSON.stringify(signOut));
    }).catch(err => {

      loading.dismiss();
      
      let toast = this.toastCtrl.create({message: err, duration: 3000, position: 'bottom' }); 
      toast.present(); 
    }); 
  }
  
  cancelButtonTapped() {
 
    this.request.memberId = null;
    this._reset();
    this.scanButtonTapped();
  } 

  listItemTapped(idx) {

  } 

  private _addObservvers() {
    
    this.events.subscribe("BarCodeScanningPage.newCodeScanned", (barcodeText) => {
    this._newBarCodeScanned(barcodeText);
    });   
  }

  private _newBarCodeScanned(barcodeText) {

    CZLogger.log("_newBarCodeScanned 1 : " + JSON.stringify(barcodeText));
    if (barcodeText == null) {

      let toast = this.toastCtrl.create({message: "Unable to scan", duration: 3000, position: 'bottom' }); 
      toast.present();
      return;
    }  

    CZLogger.log("_newBarCodeScanned 2 : " + JSON.stringify(barcodeText));
  if (barcodeText == null) {

    let toast = this.toastCtrl.create({message: "Invalid Bar code", duration: 3000, position: 'bottom' }); 
    toast.present();
    return;
  } 

  CZLogger.log("_newBarCodeScanned 3 : " + JSON.stringify(barcodeText));
   
  this._reset(); 
  this.request.memberId = barcodeText;

  CZLogger.log("_newBarCodeScanned 4: " + JSON.stringify(barcodeText));
  this._getSignInStatus(); 
  }

  private _removeObservers() {

    this.events.unsubscribe("BarCodeScanningPage.newCodeScanned");  
  }
  

  private _reset() {
    
    this.alreadySignInCardViewModel.flush();
    this.signInCardViewModel.flush();
    this.signOutCardViewModel.flush();
    this.notyetSignedInViewModel.flush();
     
    this.alreadySignInCardViewModel = new AlreadySignInCardViewModel();
    this.signInCardViewModel = new SignInCardViewModel();
    this.signOutCardViewModel = new SignOutCardViewModel();
    this.notyetSignedInViewModel = new NotyetSignedInViewModel(); 

    this.bottomViewModelList = null;
  }

  private _getSignInStatus() {
 
    CZLogger.log("_newBarCodeScanned 4.1");
    let request = this.request; 

    CZLogger.log("_newBarCodeScanned 4.2");
    if (this.picket != undefined || this.picket != null) {

      CZLogger.log("_newBarCodeScanned 4.3");
      if (this.picket.StrikeInfoId != undefined || this.picket.StrikeInfoId != null) {

        CZLogger.log("_newBarCodeScanned 4.4");
        request.strikeId = ""+this.picket.StrikeInfoId; 
      }

      CZLogger.log("_newBarCodeScanned 4.5");
      if (this.picket.ID != undefined || this.picket.ID != null) {

        CZLogger.log("_newBarCodeScanned 4.6");
        request.picketId = ""+this.picket.ID; 
      }
    }
     
    CZLogger.log("_newBarCodeScanned 5");
    if (this.isSignInTabSelected == true) {

      request.isForSignIn = true
    } else {

      request.isForSignIn = false
    } 

    let err = new SignInRequestValidator(request).getErrorMeaaage();

    CZLogger.log("_newBarCodeScanned 6");
    if (err) {

     let toast = this.toastCtrl.create({message: err, duration: 3000, position: 'bottom' }); 
     toast.present();
     return;
    }
 
    CZLogger.log("_newBarCodeScanned 7");
    let loading = this.loadingCtrlr.create({spinner: 'hide', content: 'Loading Please Wait...' });
    loading.present();

    this.strikeSignInSignOutProvider.getSignInStatus(request).then(dataSet => {

      CZLogger.log("_newBarCodeScanned 8 :" + JSON.stringify(dataSet)); 
     loading.dismiss();

     if (this.isSignInTabSelected == true) {

      this._updateSignInDataSet(dataSet); 
      this._showResentSignInList(dataSet);
     } else {

      this._updateSignOutDataSet(dataSet); 
      this._showResentSignOutList(dataSet);
     } 

    }).catch(error => {

      CZLogger.log("_newBarCodeScanned 9 :" + JSON.stringify(error));  
     loading.dismiss();

     let toast = this.toastCtrl.create({message: error, duration: 3000, position: 'bottom' }); 
     toast.present();  
    });
 }

   private _updateSignInDataSet(dataSet :SignInDataSet) {
 
    this.signInDataSet = dataSet;
  
    if (dataSet.signInData != null && dataSet.lastSignInData == null) {
 
      this.signInCardViewModel.setSignInData(dataSet.signInData);
      this.signInCardViewModel.isHidden = false;
      
      CZLogger.log("this.signInCardViewModel : "+ JSON.stringify(this.signInCardViewModel));
      return;
    }  
    
    if (dataSet.signInData != null && dataSet.lastSignInData != null) {
 
      this.alreadySignInCardViewModel.setSignInData(dataSet.signInData, dataSet.lastSignInData); 
      this.alreadySignInCardViewModel.isHidden = false;

      CZLogger.log("this.alreadySignInCardViewModel : "+ JSON.stringify(this.alreadySignInCardViewModel));
      return;
    }    
   }  

   private _updateSignOutDataSet(dataSet :SignInDataSet) {
 
    this.signInDataSet = dataSet;
  
    if (dataSet.signInData != null && dataSet.lastSignInData != null) {
 
      this.signOutCardViewModel.setSignOutData(dataSet.signInData, dataSet.lastSignInData);
      this.signOutCardViewModel.isHidden = false;
      
      CZLogger.log("this.signInCardViewModel : "+ JSON.stringify(this.signOutCardViewModel));
      return;
    }  
    
    if (dataSet.signInData != null && dataSet.lastSignInData == null) {
 
      this.notyetSignedInViewModel.setSignOutData(dataSet.signInData); 
      this.notyetSignedInViewModel.isHidden = false;

      CZLogger.log("this.alreadySignInCardViewModel : "+ JSON.stringify(this.notyetSignedInViewModel));
      return;
    }    
   }

  private _showResentSignInList(dataSet :SignInDataSet) {

    if (dataSet.lastSignInList == null) { return; }

    let viewModels = new Array<StrikeSignInListViewModel>();
 
    for (let latsSignIn of dataSet.lastSignInList) { 

          viewModels.push(new StrikeSignInListViewModel("Last sign-in ", latsSignIn));
    }   
    
    this.bottomViewModelList = viewModels;
  }

  private _showResentSignOutList(dataSet :SignInDataSet) {

    if (dataSet.lastSignInList == null) { return; }

    let viewModels = new Array<StrikeSignInListViewModel>();
 
    for (let latsSignIn of dataSet.lastSignInList) { 

          viewModels.push(new StrikeSignInListViewModel("Last sign-Out ", latsSignIn));
    }   
    
    this.bottomViewModelList = viewModels;
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

class ScanCardViewModel {

  title :string = "";

  setTitle(title :string) {

    this.title = title;
  }
}


class StrikeSignInListViewModel {

  message :string = ""; 

  constructor(private prefix :string, public lastSignInData: LastSignInData) {
 
    this.message = this._buildMessage(); 
 }

  flush() {

  }

  private _buildMessage() :string {
    
    let add = this.prefix;// @ 8:35 PM 
 
    let temp = this._trim(this.lastSignInData.SignInTime); 

    let date = this._formattedDateString(temp); 
    if (date != null) { 
      add = add+" "+date; 
    }

    let time = this._formattedTimeString(temp); 
    if (time != null) { 
      add = add+" @ "+time; 
    }
   
    return add;
  }

  private _formattedDateString(d) {
  
    if (d == undefined) { return null; }
 
    if (d == null) { return null; } 
    let newDate = new Date(Date.parse(d)); 
    
    return newDate.toDateString();
 }

 private _formattedTimeString(d) {
  
  if (d == undefined) { return null; }

  if (d == null) { return null; } 
  let newDate = new Date(Date.parse(d)); 
  
  return newDate.toTimeString();
 } 

  private _trim(temp) :string {

    if (temp == undefined) { return null; } 
    if (temp == null) { return null; } 
    if (temp == "") { return null; } 
    if (temp == " ") { return null; } 

    return temp;
  }
}


class NotyetSignedInViewModel { 

  isHidden :Boolean = true;
  title :string = "";
 
  setSignOutData(signInData :SignInData) {
    this.title = "Not yet Signed-in!!!"
  }

  flush() {
    
  }
}

class SignInCardViewModel { 

  isHidden :Boolean = true;
  memberName :string = null;
  address :string = null;
  picketLine :string = null;
  signInData :SignInData = null;
  
  setSignInData(signInData :SignInData) {

    this.signInData = signInData;
    this.memberName = signInData.MemberName;
    this.picketLine = "Picketline: "+signInData.StrikeLine;
    this.address = this._buildAddress();

    CZLogger.log("SignInCardViewModel.address : " + this.address);
  }

  flush() {
    
  }

  private _buildAddress() :string {
    
    let add = ""

    let temp = this._trim(this.signInData.Address_1);  
    if (temp != null) {

      add == temp; 
    }
 
    temp = this._trim(this.signInData.Address_2); 
    if (temp != null) {
 
      if (add == "") {
         add = temp; 
      } else {
        add = add+", "+temp;
      } 
    }

    temp = this._trim(this.signInData.City); 
    if (temp != null) { 

      if (add == "") {
        add = temp; 
     } else {
       add = add+", "+temp;
     } 
    }
 
    temp = this._trim(this.signInData.State); 
    if (temp != null) { 

      if (add == "") {
        add = temp; 
     } else {
       add = add+", "+temp;
     } 
    }
 
    temp = this._trim(this.signInData.Zip); 
    if (temp != null) { 

      if (add == "") {
        add = temp; 
     } else {
       add = add+", "+temp;
     } 
    }
 
    temp = this._trim(this.signInData.Phone); 
    if (temp != null) {

      if (add == "") {
        add = "Ph :"+temp; 
     } else {
        add = add+", Ph :"+temp;
     } 
      
    } 

    return add;
  }

  private _trim(temp) :string {

    if (temp == undefined) { return null; } 
    if (temp == null) { return null; } 
    if (temp == "") { return null; } 
    if (temp == " ") { return null; } 

    return temp;
  }
}   

class SignOutCardViewModel extends SignInCardViewModel { 
 
  private timeOut :number;
  private lastSignInData :LastSignInData;

  countDownString :string = "00:00:00"

  setSignOutData(signOutData :SignInData, lastSignInData :LastSignInData) {
 
    super.setSignInData(signOutData)  

    this.lastSignInData = lastSignInData;

    this._stopCountDown();
    this._startCountDown(); 
  }

  private _startCountDown() {

    if (this.timeOut != null) { return; }
    this._updateCountDown();
  }

  private _updateCountDown() {

     let countDown = this._countDownString();
      CZLogger.log("countDown :" + countDown)
     this.countDownString = countDown; 

    this.timeOut = setTimeout(() => { 
        this._updateCountDown();
    },  1000); 
  } 

  private _stopCountDown() {
    
    if (this.timeOut != null) {

      clearTimeout(this.timeOut);
      this.timeOut = null;
    } 
  }

  // private _countDownString() :string {

  //   let currentDate = new Date();
  //   let signDate = this._signedInDate();

  //   CZLogger.log("currentDate : " + currentDate + ", " + "signDate : " + signDate)
  //   if (currentDate == null || signDate == null) { return "00:00:00"; }  
  
  //   let dateFuture = currentDate.getTime();
  //   let dateNow = signDate.getTime();
  
  //   //milliseconds
  //   let different = Math.abs(dateFuture - dateNow) /1000;;
 
  //   let sec = different;
     
  //   let hrs = sec / 3600;
  //   let remainder = sec % 3600;
  //   let mins = remainder / 60;
      
 
  //   CZLogger.log("diff : " + different + " hours : " + hrs + ", " + "minutes : " + mins);

  //   return Math.floor(hrs) + ":" + Math.floor(mins);
  // }
  
  private _countDownString() :string {

    let currentDate = new Date();
    let signDate = this._signedInDate();
 
    if (currentDate == null || signDate == null) { return "00:00:00"; }  
  
    let dateFuture = currentDate.getTime();
    let dateNow = signDate.getTime();
  
    var delta = Math.abs(dateFuture - dateNow) / 1000;
  
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
  
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
  
    var seconds = delta % 60;  
     
    if (hours <= 0) { hours = 0; }
    if (minutes <= 0) { minutes = 0; }
    if (seconds <= 0) { seconds = 0; }

    let h = ""+Math.floor(hours); 
    let m = ""+Math.floor(minutes); 
    let s = ""+Math.floor(seconds); 
  
    if (h.length == 1) { h = "0" + h; }
    if (m.length == 1) { m = "0" + m; }
    if (s.length == 1) { s = "0" + s; }
 
    return h + ":" + m + ":" + s ;
  }

  private _signedInDate() :Date {
  
    let d = this.lastSignInData.SignInTime;
    if (d == undefined) { return null; }
  
    if (d == null) { return null; } 
    let newDate = new Date(Date.parse(d)); 
    
    return newDate ;
   } 

  flush() {
    this._stopCountDown();
  }
} 

class AlreadySignInCardViewModel { 

  isHidden :Boolean = true;
  title :string = null;
  message :string = null;

  signInData :SignInData = null;
  lastSignInData :LastSignInData = null;
  
  setSignInData(signInData :SignInData, lastSignInData :LastSignInData) {

    this.signInData = signInData; 
    this.lastSignInData = lastSignInData; 

    if (lastSignInData != null) { 
      this.title = "Already Signed-in !!!";
    }

    if (lastSignInData != null) { 
      this.message = this._buildMessage();
    }
  }

  flush() {
    
  }

  private _buildMessage() :string {
    
    let add = ""

    let temp = this._trim(this.signInData.MemberId);  
    if (temp != null) { 
      add == temp; 
    }

    temp = this._trim(this.signInData.MemberName); 
    if (temp != null) {
      
      add = add+" "+temp; 
    }

    temp = this._trim(this.lastSignInData.SignInTime); 

    let date = this._formattedDateString(temp); 
    if (date != null) { 
      add = add+" "+date; 
    }

    let time = this._formattedTimeString(temp); 
    if (time != null) { 
      add = add+" @ "+time; 
    }
   
    return add;
  }

  private _formattedDateString(d) {
  
    if (d == undefined) { return null; }
 
    if (d == null) { return null; } 
    let newDate = new Date(Date.parse(d)); 
    
    return newDate.toDateString();
 }

 private _formattedTimeString(d) {
  
  if (d == undefined) { return null; }

  if (d == null) { return null; } 
  let newDate = new Date(Date.parse(d)); 
  
  return newDate.toTimeString();
 } 

  private _trim(temp) :string {

    if (temp == undefined) { return null; } 
    if (temp == null) { return null; } 
    if (temp == "") { return null; } 
    if (temp == " ") { return null; } 

    return temp;
  }
}   