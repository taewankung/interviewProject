import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GivePage } from './give';

@NgModule({
  declarations: [
    GivePage,
  ],
  imports: [
    IonicPageModule.forChild(GivePage),
  ],
  exports: [
    GivePage
  ]
})
export class GivePageModule {}
