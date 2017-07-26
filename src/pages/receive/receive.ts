import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificationProvider }from "../../providers/notification/notification";
import { FormControl } from '@angular/forms';
import { LookNotifyPage } from '../look-notify/look-notify';
import { SharedData } from '../../providers/shared-data/shared-data';
import 'rxjs/add/operator/debounceTime';

/**
 * Generated class for the ReceivePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receive',
  templateUrl: 'receive.html',
})
export class ReceivePage {
  datalist:Array<any>=[];
  searchCtrl: FormControl;
  searching: any = false;
  searchText:string = "";
  defaultImage = 'assets/loading.gif';
  image = 'http://'+this.sharedData.ip_local +'/giveAndShare/uploads/';
  offset = 100;
  start:number= 0;

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public notifyPro:NotificationProvider,
          public sharedData:SharedData
          ) {

  	this.searchCtrl = new FormControl();
    this.searchCtrl.valueChanges.debounceTime(700).subscribe(
        search => {
            this.searching = false;
            this.setFilteredItems();
          }
        );
  }

  ionViewWillEnter(){
    this.start=0;
    this.datalist=[];
    console.log('ionViewDidLoad ReceivePage');
    this.listRecieve(this.start,this.datalist);
    this.notifyPro.SearchData=this.datalist;
    
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

  setFilteredItems() {
    this.notifyPro.search(this.searchText).subscribe(observer=>{
      this.datalist = observer;
      console.log('///////////////////')
      console.log(this.datalist)
    });
  }
  
  listRecieve(start,datalist){
  	this.notifyPro.listRecieve(start,datalist).subscribe(
  	(success)=>{
  		for(let data of success){
        console.log(data);
        this.datalist.push(data);
      }
      this.start=this.start+4;
  	},(err)=>{
  		console.log(err);
  	});
  }

lookNotify(data){
    this.navCtrl.push(LookNotifyPage,{data:data,from:"recive"});
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

  doInfinite(infiniteScroll) {
    //console.log('Begin async operation');

    setTimeout(() => {
      if(this.searchText==''){
        this.listRecieve(this.start,this.datalist);
      }
      //console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
}
