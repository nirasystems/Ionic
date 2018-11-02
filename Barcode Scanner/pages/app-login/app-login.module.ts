import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppLoginPage } from './app-login';

@NgModule({
  declarations: [
    AppLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(AppLoginPage),
  ],
})

export class AppLoginPageModule {}
