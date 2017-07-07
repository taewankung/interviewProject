import { Component,ViewChild } from '@angular/core';
import { IonicPage,AlertController, Navbar , NavController, NavParams } from 'ionic-angular';
import { LookProfilePage } from '../look-profile/look-profile';
import { SharedData} from '../../providers/shared-data/shared-data';
import { NotificationProvider } from '../../providers/notification/notification';
import { InterestingProvider } from '../../providers/interesting/interesting';
import { DataServiceProvider } from '../../providers/data-service/data-service';

/**
 * Generated class for the MyManagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-manage',
  templateUrl: 'my-manage.html',
})
export class MyManagePage {
  @ViewChild('navBar') navBar: Navbar;
  start:number=0;
  data:any;
  defaultImage = 'assets/loading.gif';
  image = 'http://'+this.sharedData.ip_local +'/giveAndShare/uploads/';
  offset = 0;
  interest_point:number=0;
  accept_text="รอการตัดสิน";
  view_status:number; 
  accepting:boolean=false;
  interest_data:any={

  };
  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public sharedData: SharedData,
          public NotifyPro:NotificationProvider,
  			  public interestPro: InterestingProvider){
    this.data=this.navParams.get("data");
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad MyManagePage');
  }

  ionViewWillEnter(){
  	this.start=0;
  	console.log('ionViewWillEnter MyNotifyManagePage');
    this.navBar._mode='ios';
    this.data = this.navParams.get("data");
    console.log(this.data);
    this.interest_point = this.data.interest_point;
  	this.interestPro.view_interesting(this.data.notification_id).subscribe(
  		success=>{
  			this.interest_data=success;
  			console.log(success)
  		}
  	);
    this.viewStatus();
   
  }
  
  viewStatus(){
    this.NotifyPro.viewStatus(this.data.notification_id).subscribe(
      success=>{
        this.view_status= success;
        console.log('/////////////');
        console.log(this.view_status);
        if(this.view_status==0){
          this.accepting=false;
          this.accept_text="รอการตัดสิน";
        }
        else if(this.view_status==1){
          this.accepting=false;
          this.accept_text="ยังไม่เสร็จสิ้น"
        }
        else if(this.view_status==2){
          this.accepting=true;
          this.accept_text="เสร็จสิ้น"
        }
      }
    );
  }
  updateStatus(status){
  this.NotifyPro.update_status(this.data.notification_id,status).subscribe(()=>{this.viewStatus();});
  }
  accept(){
    this.updateStatus(2)
    this.accepting=true;
    this.accept_text="เสร็จสิ้น"
  }

  deaccept(){
    this.updateStatus(1)
    //this.NotifyPro.update_status(this.data.notification_id,1).subscribe();
    this.viewStatus();
    this.accepting=false;
    this.accept_text="ยังไม่เสร็จสิ้น"
  }

  lookProfilePage(username){
    this.navCtrl.push(LookProfilePage,{username:username});
  }


}
