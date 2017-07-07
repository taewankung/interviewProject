import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController,Navbar, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { SharedData } from '../../providers/shared-data/shared-data';

/**
 * Generated class for the HistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
@ViewChild('navBar') navBar: Navbar;
  constructor(public navCtrl: NavController, 
			  public navParams: NavParams,
			  public dataService: DataServiceProvider,
			  public sharedData: SharedData) {
  	    
  }
  ionViewWillEnter(){
	this.navBar._mode = 'ios';
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

}
