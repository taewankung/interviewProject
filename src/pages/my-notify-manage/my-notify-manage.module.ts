import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyNotifyManagePage } from './my-notify-manage';

@NgModule({
  declarations: [
    MyNotifyManagePage,
  ],
  imports: [
    IonicPageModule.forChild(MyNotifyManagePage),
  ],
  exports: [
    MyNotifyManagePage
  ]
})
export class MyNotifyManagePageModule {}
