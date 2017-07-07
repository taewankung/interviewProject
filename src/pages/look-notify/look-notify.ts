import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar,Content } from 'ionic-angular';
import { SharedData } from '../../providers/shared-data/shared-data';
import { LookProfilePage } from '../look-profile/look-profile';
import { InterestingProvider } from '../../providers/interesting/interesting'

// import "slick-carousel";
/**
 * Generated class for the LookNotifilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-look-notify',
  templateUrl: 'look-notify.html',
})
export class LookNotifyPage {
  @ViewChild('content') content: Content;
  @ViewChild('navBar') navBar: Navbar;
  addressdata:string='';
  data:any;
  counter:number=0;
  from:string='';
  message:string='';
  interest_point:number=0;
  interestToggle:boolean=true;
  interested:boolean=false;
  enable_btn:boolean=false;
  defaultImage = 'assets/loading.gif';
  image = 'http://'+this.sharedData.ip_local +'/giveAndShare/uploads/';
  offset = 0;
  next:boolean=false;
  constructor(  public navCtrl: NavController, 
  				public navParams: NavParams,
  				public sharedData:SharedData,
          public interestPro:InterestingProvider
  			) {
  	    this.data=this.navParams.get("data");
        this.counter = 0;
        console.log(this.data);
  	    //this.image = this.image + this.sharedData.username + '/'+this.data["image"];
  }

  ionViewWillEnter() {
    this.counter+=1;
    console.log(this.counter);
    console.log('ionViewDidLoad LookNotifilePage');
    this.data = this.navParams.get("data");
    this.from = this.navParams.get("from");
    this.navBar._mode = 'ios';
    this.next = false;
    this.interest_point = this.data.interest_point;
    //this.image = 'http://'+this.sharedData.ip_local +'/giveAndShare/uploads/';
    this.check_interest();
    this.update(this.data.notification_id);
    console.log(this.data);
  }

  ionViewWillLeave(){
    console.log("leave");
  }
  
  lookProfilePage(){
    this.navCtrl.push(LookProfilePage,{username:this.data.username});
    this.next=true;
  }

  status_data(data){
   if(data==0){
        return "รอการตัดสิน";
      }
      else if(data==1){
        return "ยังไม่เสร็จสิ้น"
      }
      else if(data==2){
        return "เสร็จสิ้น"
      }
  }

  test(){
    console.log(this.navBar);
  }

  interest(){
    this.interest_point +=1;
    console.log("???");
    this.interestToggle =! this.interestToggle;
    this.interested =! this.interested;
    this.enable_btn = true;
    this.content.resize();
    this.scrollTo(this.from);
  }

  check_interest(){
    console.log("check_interest");
    this.interestPro.check(this.data.notification_id).subscribe(success=>{
    console.log("////////////");
    if(success.message){
      this.interested = success.message;
      this.message = success.data;
      this.interestToggle=false;
    }
    else{
      this.interested=true;
    }
      //console.log(success);
    }
    ,(err)=>{
      this.interested=false;
      console.log(err);
    });
  }

  ignore(){
    this.interest_point -=1;
    this.interested =! this.interested;
    this.interestToggle =! this.interestToggle;
  }

  scrollTo(elementId:string) {
    console.log(document.getElementById(elementId))
    let yOffset = document.getElementById(elementId).offsetTop;
    console.log("YOffSet:"+yOffset);
    this.content.scrollTo(0, yOffset, 3000)
  }

  update(notification_id){
    this.interestPro.update(notification_id).subscribe(success=>{
      console.log('sssss');
      console.log(success);
    this.interest_point=success.data;
    },
    err=>{
      console.log(err)
    });
  }
  
  send(){
    console.log("send");
    console.log(this.data);
    this.interestPro.send(this.message,this.data.id,this.data.notification_id).subscribe(
      (success)=>{
        console.log(success)
        this.enable_btn=false;
        this.update(this.data.notification_id);
        this.check_interest();

      },
      (err)=>{
        console.log(err)
      });
  }

  delete(){
    this.ignore();
    this.interestPro.delete(this.data.id,this.data.notification_id).subscribe(
      (success)=>{
        console.log("delete")
        this.update(this.data.notification_id);
        this.check_interest();
      },(err)=>{
        console.log(err);
      });    
  }

  comment(){

  }

}
