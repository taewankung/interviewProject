import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar } from 'ionic-angular';

/**
 * Generated class for the RulePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-rule',
  templateUrl: 'rule.html',
})
export class RulePage {
	@ViewChild('navBar') navBar: Navbar;
	constructor(public navCtrl: NavController, public navParams: NavParams) {
  	}
	ionViewDidLoad() {
    	console.log('ionViewDidLoad RulePage');
  	}
	ionViewWillEnter() {
		console.log('ionViewDidLoad RegisterPage');
		this.navBar._mode='ios';
	}
}
