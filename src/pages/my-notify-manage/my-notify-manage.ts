import { Component,ViewChild } from '@angular/core';
import { IonicPage,AlertController, Navbar , NavController, NavParams } from 'ionic-angular';
import { SharedData} from '../../providers/shared-data/shared-data';
import { MyManagePage } from '../my-manage/my-manage';
import { NotificationProvider} from '../../providers/notification/notification';

/**
 * Generated class for the MyNotifyManagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-notify-manage',
  templateUrl: 'my-notify-manage.html',
})
export class MyNotifyManagePage {
  @ViewChild('navBar') navBar: Navbar;
  dataList:Array<any>=[];
  start:number= 0;
  interestNumber:number= 0;
  data:any;

  constructor(public navCtrl: NavController,
  			  public sharedData:SharedData,
  			  public notifyPro: NotificationProvider, 
  			  public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyNotifyManagePage');
  }

  ionViewWillEnter() {
  	this.start=0;
  	this.dataList=[];
  	console.log('ionViewWillEnter MyNotifyManagePage');
    this.navBar._mode='ios';
    this.myList(this.start,this.dataList);
  }

  myList(start,datalist){
    this.notifyPro.myList(start,this.dataList).subscribe((success)=>{
      for(let data of success){
        console.log(data);
        this.dataList.push(data);
      	console.log(this.dataList);
      }
      this.start=this.start+4;

    },(err)=>{
      console.log(err);
    });
  }

  gotoManage(data){
  	this.navCtrl.push(MyManagePage,{data:data});
  }

  delete(){
    console.log("delete");
  }
}