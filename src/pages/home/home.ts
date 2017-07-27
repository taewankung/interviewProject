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

  status_data(data,type){
     if(data==0){
          return this.sharedData.text[this.sharedData.lang]["wait"];
        }
        else if(data==1){
          return this.sharedData.text[this.sharedData.lang]["non_finish"];
        }
        else if(data==2 && type=="give"){
          return this.sharedData.text[this.sharedData.lang]["give_finish"];
        }
        else if(data==2 && type=="recieve"){
          return this.sharedData.text[this.sharedData.lang]["recieve_finish"];
        }
  }

  type_name(type){
    if(type=="give"){
      return  this.sharedData.text[this.sharedData.lang]["giving"]
    }
    else if(type=="recieve"){
      return this.sharedData.text[this.sharedData.lang]["recieving"]
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
    this.notifyPro.search(this.searchText).subscribe(observer=>{
    	this.datalist = observer;
    	console.log('///////////////////')
    	console.log(this.datalist)
    });

  }

  list(start,datalist){
    let i =0;
    this.notifyPro.list(start,this.datalist).subscribe((success)=>{
      for(let data of success){
        //console.log('//////////////////////////////////////////////////')
        //console.log(data);
        i++;
        this.datalist.push(data);
        console.log(i);
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
