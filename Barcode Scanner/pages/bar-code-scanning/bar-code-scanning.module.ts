import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarCodeScanningPage } from './bar-code-scanning';

@NgModule({
  declarations: [
    BarCodeScanningPage,
  ],
  imports: [
    IonicPageModule.forChild(BarCodeScanningPage),
  ],
})

export class BarCodeScanningPageModule {}
