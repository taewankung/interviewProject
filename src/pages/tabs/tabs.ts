import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { HomePage } from '../home/home'
import { GivePage } from '../give/give'
import { ReceivePage } from '../receive/receive'
//import { NotifyPage } from '../notify/notify'

/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

	tab1Root = HomePage;
	tab2Root = GivePage;
	tab3Root = ReceivePage;

	hided = true;
	@ViewChild('myTabs') tabRef: Tabs;
	constructor(public navCtrl: NavController, 
				public navParams: NavParams) {

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad TabsPage');
		if(this.navParams.get("index")){
			console.log(this.navParams.get("index"));
		}
	}

}
