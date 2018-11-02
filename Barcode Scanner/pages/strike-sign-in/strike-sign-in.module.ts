import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StrikeSignInPage } from './strike-sign-in';

@NgModule({
  declarations: [
    StrikeSignInPage,
  ],
  imports: [
    IonicPageModule.forChild(StrikeSignInPage),
  ],
})

export class StrikeSignInPageModule {}
