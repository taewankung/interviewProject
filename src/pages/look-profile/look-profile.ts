import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController,Navbar, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { SharedData } from '../../providers/shared-data/shared-data';
import { HistoryPage } from '../history/history';
import { CommentPage } from '../comment/comment';

/**
 * Generated class for the LookProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-look-profile',
  templateUrl: 'look-profile.html',
})
export class LookProfilePage {
@ViewChild('navBar') navBar: Navbar;
  username:any;
  counter:number=0;
  defaultImage = 'assets/pic/person.png';
  image = 'http://'+this.sharedData.ip_local +'/giveAndShare/uploads/';
  offset = 0;
  data:any={username:'loading...',
			name:'',
			surname:'',
			email:'',
			tel:'',
			avatar:'',
			AMPHUR_NAME:'',
			PROVINCE_NAME:''
	};

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public dataService: DataServiceProvider,
    public sharedData: SharedData
  	) {
	this.username = this.navParams.get("username");
	console.log(this.username)
  //console.log("//////////////")
	this.view_profile();
  }

  ionViewWillEnter() {
    this.counter+=1;
    if(this.counter>=2){
      this.navCtrl.popToRoot();
    }
    console.log('ionViewDidLoad LookProfilePage');
    
    this.navBar._mode = 'ios';
  	this.view_profile();
  }
  ionViewDidLeave(){
  	console.log("leave");
   // this.navCtrl.popToRoot();
  }
  view_profile(){
  	this.dataService.view_profile(this.username).subscribe(
    		(data)=>{
    			this.data=data;
    			console.log(data);
    		},
    		(err)=>{
    			this.data=err;
				console.log(err);
    		}
    	);
  }
  
  gotoComment(){
    this.counter-=1;
    this.navCtrl.push(CommentPage,{"data":this.data});
  }

  gotoHistory(){
    this.counter-=1;
    this.navCtrl.push(HistoryPage,{"data":this.data});
  }
}
