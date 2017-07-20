import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { NotificationProvider} from '../../providers/notification/notification';
import { SharedData} from '../../providers/shared-data/shared-data';
import { FormControl } from '@angular/forms';
import { LookNotifyPage } from '../look-notify/look-notify';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  datalist:any=[];
  start:number =0;
  defaultImage = 'assets/loading.gif';
  image = 'http://'+this.sharedData.ip_local +'/giveAndShare/uploads/';
  offset = 0;

  searchText: string = '';
  searchCtrl: FormControl;
  searching: any = false;
  id:number;
  enter:true;
  status_text:string;
  constructor(public navCtrl: NavController,
  			  public notifyPro: NotificationProvider,
          	  public navParams: NavParams,
          	  public sharedData: SharedData
  			 ) {

    this.searchCtrl = new FormControl();
    this.searchCtrl.valueChanges.debounceTime(700).distinctUntilChanged().subscribe(
      search => {
        this.searching = false;
        this.setFilteredItems();
      }
    );

  }

  ionViewWillEnter(){
    this.start=0;
    this.datalist=[];
  	this.list(this.start,this.datalist);
    this.notifyPro.SearchData=this.datalist;
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

  onSearchInput(){
    this.searching = true;
  }

  lookNotify(data){
  	console.log(data);
    this.navCtrl.push(LookNotifyPage,{data:data,from:"home"});
  }

  setFilteredItems() {
    this.datalist = this.notifyPro.search(this.searchText);
  }

  list(start,datalist){
    this.notifyPro.list(start,this.datalist).subscribe((success)=>{
      for(let data of success){
        //console.log('//////////////////////////////////////////////////')
        //console.log(data);
        this.datalist.push(data);
      }
      this.start = this.start+4;
    },(err)=>{console.log(err);
    });
  }

  doInfinite(infiniteScroll) {
    //console.log('Begin async operation');

    setTimeout(() => {
      // for (let i = 0; i < 30; i++) {
      //   this.datalist.push( this.datalist.length );
      // }
    if(this.searchText == '' ){
      this.list(this.start,this.datalist);
      //console.log(this.start);
      //console.log(this.datalist.length)
     }
     // console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
}
