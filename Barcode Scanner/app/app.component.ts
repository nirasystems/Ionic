import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppLoginPage } from '../pages/app-login/app-login';  
import { StrikeDetailPage } from '../pages/strike-detail/strike-detail';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = AppLoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

