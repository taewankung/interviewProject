import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyInterestingPage } from './my-interesting-page';

@NgModule({
  declarations: [
    MyInterestingPage,
  ],
  imports: [
    IonicPageModule.forChild(MyInterestingPage),
  ],
  exports: [
    MyInterestingPage
  ]
})
export class MyInterestingPageModule {}
