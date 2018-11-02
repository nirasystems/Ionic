import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component'; 
import { AppLoginPage } from '../pages/app-login/app-login';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { StrikeListPage } from '../pages/strike-list/strike-list';
import { StrikeDetailPage } from '../pages/strike-detail/strike-detail';
import { StrikeSignInPage } from '../pages/strike-sign-in/strike-sign-in';
import { StrikeSignOutPage } from '../pages/strike-sign-out/strike-sign-out';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import { TokenProvider } from '../providers/token/token';
import { URLProvider } from '../providers/url/url';
import { HttpProxiProvider } from '../providers/http-proxi/http-proxi'; 
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { StrikeProvider } from '../providers/strike/strike';
import { PicketLineProvider } from '../providers/picket-line/picket-line';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { StrikeSignInSignOutProvider } from '../providers/strike-sign-in-sign-out/strike-sign-in-sign-out';
import { BarCodeScanningPage } from '../pages/bar-code-scanning/bar-code-scanning';

@NgModule({
  declarations: [
    MyApp, 
    AppLoginPage,
    ConfigurationPage,
    StrikeListPage,
    StrikeDetailPage,
    StrikeSignInPage,
    StrikeSignOutPage,
    BarCodeScanningPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot() 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, 
    AppLoginPage,
    ConfigurationPage,
    StrikeListPage,
    StrikeDetailPage,
    StrikeSignInPage,
    StrikeSignOutPage,
    BarCodeScanningPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalStorageProvider,
    TokenProvider,
    URLProvider,
    HttpProxiProvider,
    StrikeProvider,
    PicketLineProvider,
    BarcodeScanner,
    StrikeSignInSignOutProvider,
    StrikeSignInSignOutProvider
  ]
})
export class AppModule {}
