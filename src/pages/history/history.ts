import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController,Navbar, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { NotificationProvider } from '../../providers/notification/notification';
import { SharedData } from '../../providers/shared-data/shared-data';
import { FormControl } from '@angular/forms';
import { LookNotifyPage } from '../look-notify/look-notify';

import 'rxjs/add/operator/debounceTime';
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
  defaultImage = 'assets/loading.gif';
  image = 'http://'+this.sharedData.ip_local +'/giveAndShare/uploads/';
  offset = 0;
  data:any;
  datalist:any;
  start:number=0;
  dataInlist:any;

  searchText: string = '';
  searchCtrl: FormControl;
  searching: any = false;
  constructor(public navCtrl: NavController, 
			  public navParams: NavParams,
			  public dataService: DataServiceProvider,
			  public sharedData: SharedData,
        public notifyPro:NotificationProvider) {

    this.searchCtrl = new FormControl();
    this.searchCtrl.valueChanges.debounceTime(700).subscribe(
      search => {
        this.searching = false;
        this.setFilteredItems();
      }
    );

  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter HistoryPage');
	  this.navBar._mode = 'ios';
    this.data = this.navParams.get("data");
    this.start=0;
    this.datalist=[];
    this.listHistory(this.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
    //this.listHistory(this.data);
  }

  setFilteredItems() {
    this.dataInlist = this.notifyPro.searchIn(this.searchText,this.datalist);
  }
  listHistory(data){
    console.log('//////////////');
    console.log(data.username)
    console.log('//////////////');
    this.notifyPro.someoneList(this.start,this.datalist,data.username).subscribe(
      (historydata) =>{
        console.log(historydata);
      for(let data of historydata){
        console.log(data);
        this.datalist.push(data);
      }
      this.start=this.start+4;
    },(err)=>{
      console.log(err)
    });
  }

  status_data(data,type){
     if(data==0){
          return "รอการตัดสิน";
        }
        else if(data==1){
          return "ยังไม่เสร็จสิ้น"
        }
        else if(data==2 && type=="give"){
          return "ให้เรียบร้อยแล้ว"
        }
        else if(data==2 && type=="recieve"){
          return "รับของเรียบร้อยแล้ว"
        }
  }

  lookNotify(data){
    console.log(data);
    this.navCtrl.push(LookNotifyPage,{data:data,from:"history"});
  }

  doInfinite(infiniteScroll) {
    //console.log('Begin async operation');

    setTimeout(() => {
      // for (let i = 0; i < 30; i++) {
      //   this.datalist.push( this.datalist.length );
      // }
    if(this.searchText == '' ){
      this.listHistory(this.data);
     }
     // console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
}
