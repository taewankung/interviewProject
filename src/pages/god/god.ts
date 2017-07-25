import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SharedData } from '../../providers/shared-data/shared-data';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../providers/auth-service/auth-service';
import { CommentProvider } from '../../providers/comment/comment';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { FromServiceProvider } from '../../providers/from-service/from-service';
import { InterestingProvider } from '../../providers/interesting/interesting';
import { NotificationProvider } from '../../providers/notification/notification';
/**
 * Generated class for the GodPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-god',
  templateUrl: 'god.html',
})
export class GodPage {
  ip:string;
  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public sharedData: SharedData,
  			  public storage:Storage,
  			  public authService:AuthService,
  			  public commentPro:CommentProvider,
  			  public dataService:DataServiceProvider,
  			  public formService:FromServiceProvider,
  			  public interesting:InterestingProvider,
  			  public notificataion:NotificationProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GodPage');
  }

  back(){
  	console.log("Exit Godmode");
  	this.navCtrl.setRoot(LoginPage);
  }

  set(){
  	this.sharedData.ip_local=this.ip;
  	this.storage.set('ip',this.sharedData.ip_local);
  	this.authService.update_ip();
  	this.commentPro.update_ip();
  	this.formService.update_ip();
  	this.interesting.update_ip();
  	this.notificataion.update_ip();
  	console.log(this.sharedData.ip_local);
  	console.log("Success");
  }
}
