import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LookNotifyPage } from './look-notify';

@NgModule({
  declarations: [
    LookNotifyPage,
  ],
  imports: [
    IonicPageModule.forChild(LookNotifyPage),
  ],
  exports: [
    LookNotifyPage
  ]
})
export class LookNotifilePageModule {}
