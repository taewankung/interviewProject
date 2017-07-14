import { Component,ViewChild } from '@angular/core';
import { IonicPage, Navbar , NavController, NavParams } from 'ionic-angular';
import { SharedData} from '../../providers/shared-data/shared-data';
//import { MyManagePage } from '../my-manage/my-manage';
import { LookNotifyPage } from '../look-notify/look-notify';
import { NotificationProvider} from '../../providers/notification/notification';
import { FormControl } from '@angular/forms';
/**
 * Generated class for the MyNotifyManagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-interesting',
  templateUrl: 'my-interesting-page.html',
})
export class MyInterestingPage {
  @ViewChild('navBar') navBar: Navbar;
  dataList:Array<any>=[];
  start:number= 0;
  interestNumber:number= 0;
  data:any;
  dataInList:any;

  searchText: string = '';
  searchCtrl: FormControl;
  searching: any = false;
  constructor(public navCtrl: NavController,
  			  public sharedData:SharedData,
  			  public notifyPro: NotificationProvider, 
  			  public navParams: NavParams) {

    this.searchCtrl = new FormControl();
    this.searchCtrl.valueChanges.debounceTime(700).subscribe(
      search => {
        this.searching = false;
        this.setFilteredItems();
      }
    );
  }
  
  ionViewWillEnter() {
  	this.start=0;
  	this.dataList=[];
  	console.log('ionViewWillEnter MyInterestingPage');
    this.navBar._mode='ios';
    this.myInterestingList(this.start,this.dataList);
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

  myInterestingList(start,datalist){
    this.notifyPro.myInterestingList(start,this.dataList).subscribe((success)=>{
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

  setFilteredItems() {
  	console.log('??')
    this.dataInList = this.notifyPro.searchIn(this.searchText,this.dataList);
  }

  gotoManage(data){
  	this.navCtrl.push(LookNotifyPage,{data:data});
  }

  delete(){
    console.log("delete");
  }

    doInfinite(infiniteScroll) {
    //console.log('Begin async operation');

    setTimeout(() => {
      // for (let i = 0; i < 30; i++) {
      //   this.datalist.push( this.datalist.length );
      // }
    if(this.searchText == '' ){
      this.myInterestingList(this.start,this.data);
     }
     // console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
}