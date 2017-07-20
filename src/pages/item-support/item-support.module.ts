import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemSupportPage } from './item-support';

@NgModule({
  declarations: [
    ItemSupportPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemSupportPage),
  ],
  exports: [
    ItemSupportPage
  ]
})
export class ItemSupportPageModule {}
