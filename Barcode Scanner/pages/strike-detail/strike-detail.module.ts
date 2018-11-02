import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StrikeDetailPage } from './strike-detail';

@NgModule({
  declarations: [
    StrikeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(StrikeDetailPage),
  ],
})

export class StrikeDetailPageModule {}
