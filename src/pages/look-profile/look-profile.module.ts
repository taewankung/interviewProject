import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LookProfilePage } from './look-profile';

@NgModule({
  declarations: [
    LookProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(LookProfilePage),
  ],
  exports: [
    LookProfilePage
  ]
})
export class LookProfilePageModule {}
