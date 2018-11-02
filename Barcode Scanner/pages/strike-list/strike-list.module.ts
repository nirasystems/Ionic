import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StrikeListPage } from './strike-list';

@NgModule({
  declarations: [
    StrikeListPage,
  ],
  imports: [
    IonicPageModule.forChild(StrikeListPage),
  ],
})

export class StrikeListPageModule {}
