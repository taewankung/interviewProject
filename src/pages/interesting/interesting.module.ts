import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InterestingPage } from './interesting';

@NgModule({
  declarations: [
    InterestingPage,
  ],
  imports: [
    IonicPageModule.forChild(InterestingPage),
  ],
  exports: [
    InterestingPage
  ]
})
export class InterestingPageModule {}
