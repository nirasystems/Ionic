import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { ConfigurationPage } from '../configuration/configuration';
import { StrikeListPage } from '../strike-list/strike-list';
import { TokenProvider } from '../../providers/token/token';
import { ILogin } from '../../models/login ';
import { CZLogger } from '../../Utility/czlogger';
 
/**
 * Generated class for the AppLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-app-login',
  templateUrl: 'app-login.html',
})
export class AppLoginPage {

  input = new ILogin();
  username :string 
  password :string 

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private tokenProvider :TokenProvider, 
    private loadingCtrlr: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppLoginPage');
  }

  signInButtonTapped() {
 
    let input = this.input; 
 
    let loading = this.loadingCtrlr.create({spinner: 'hide', content: 'Loading Please Wait...' });
    loading.present();
    
    this.tokenProvider.getToken(input).then(token => {
 
      loading.dismiss(); 
      this.navCtrl.setRoot(StrikeListPage);

       
    }).catch(error => {

      loading.dismiss(); 
      let toast = this.toastCtrl.create({message: error, duration: 3000, position: 'bottom' }); 
      toast.present();
    });
  }

 configurationButtonTapped() {

    this.navCtrl.push(ConfigurationPage);
  }

}