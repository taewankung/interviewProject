import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar,Content } from 'ionic-angular';
import { SharedData } from '../../providers/shared-data/shared-data';
/**
 * Generated class for the SettingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  @ViewChild('content') content: Content;
  @ViewChild('navBar') navBar: Navbar;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
	public sharedData: SharedData)
  			   {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  ionViewWillEnter() {
    this.navBar._mode = 'ios';
  }
 changeTheme(theme) {
   this.sharedData.set('theme', theme);
   console.log(this.sharedData._state)
 }
}
