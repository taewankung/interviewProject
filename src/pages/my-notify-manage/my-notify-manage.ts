import { Component,ViewChild } from '@angular/core';
import { IonicPage, Navbar , NavController, NavParams } from 'ionic-angular';
import { SharedData} from '../../providers/shared-data/shared-data';
import { MyManagePage } from '../my-manage/my-manage';
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
  selector: 'page-my-notify-manage',
  templateUrl: 'my-notify-manage.html',
})
export class MyNotifyManagePage {
  @ViewChild('navBar') navBar: Navbar;
  dataList:Array<any>=[];
  start:number= 0;
  interestNumber:number= 0;
  data:any;


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
  setFilteredItems() {
    this.dataList = this.notifyPro.searchIn(this.searchText,this.dataList);
  }

  gotoManage(data){
  	this.navCtrl.push(MyManagePage,{data:data});
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
      this.myList(this.start,this.data);
     }
     // console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
}