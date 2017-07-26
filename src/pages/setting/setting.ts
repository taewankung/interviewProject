import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar,Content } from 'ionic-angular';
import { SharedData } from '../../providers/shared-data/shared-data';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { Storage } from '@ionic/storage';
//import {Observable} from 'rxjs/Observable';
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
  theme = new FormControl('')
  themeText ='default';
  lang = new FormControl('TH');
  langText = 'TH';

  constructor(
    public navCtrl: NavController, 
  	public navParams: NavParams,
	  public sharedData: SharedData,
    public storage:Storage)
  {
    this.storage.get('theme').then(theme=>{
      this.theme.setValue(theme);
    });
    this.storage.get('lang').then(lang=>{
      if(lang){
        this.lang.setValue(lang);
      }
    });
    this.theme.valueChanges.debounceTime(1000).subscribe(
      (data)=>{
        //console.log(data)
        this.changeTheme(data);
        this.storage.set('theme', this.theme.value);
      }
    );
    this.lang.valueChanges.debounceTime(1000).subscribe(
      (data)=>{
        //console.log(data)
        this.changeLang(data);
        this.storage.set('lang', this.lang.value);
      }
    );
    console.log(this.lang.value)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  ionViewWillEnter() {
    this.navBar._mode = 'ios';
  }
 changeTheme(theme) {
   this.sharedData.set('theme', theme);
   console.log(this.sharedData._state);
   console.log(this.theme);
 }

 changeLang(lang){
   //console.log("//////////////////"+lang);
   this.sharedData.setLang(lang);
   console.log(this)
 }
}