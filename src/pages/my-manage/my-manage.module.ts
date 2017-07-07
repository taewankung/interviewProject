import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyManagePage } from './my-manage';

@NgModule({
  declarations: [
    MyManagePage,
  ],
  imports: [
    IonicPageModule.forChild(MyManagePage),
  ],
  exports: [
    MyManagePage
  ]
})
export class MyManagePageModule {}
