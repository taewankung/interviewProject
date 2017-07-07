import { Component,ViewChild } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams,Navbar } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
//import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../../providers/auth-service/auth-service';
import { SharedData } from '../../providers/shared-data/shared-data';
import { FromServiceProvider  } from '../../providers/from-service/from-service';
import { FormGroup,FormControl } from '@angular/forms';
import {Md5} from 'ts-md5/dist/md5';
import 'rxjs/add/operator/debounceTime';
/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-register',
	templateUrl: 'register.html',
})
export class RegisterPage {
	@ViewChild('navBar') navBar: Navbar;
	createSuccess=false;
	proviceList:any=[];
	provinceData:number=-1;
	amphurList:any=[];
	amphurData:number=0;
	form =new FormGroup({
		provinceData:new FormControl(-1)
	})
  	registerCredentials:any = { 
						uid:'',
						username:'',
						password: '',
						name: '',
						surname:'',
						tel: '',
						email: '',
						province_id:-1,
						amphur_id:0 
                        };

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public sharedData: SharedData,
				public authen:AuthService,
				public menuCtrl:MenuController,
				public alertCtrl:AlertController,
				public fromService:FromServiceProvider
	  			) {
		this.listProvince();
		this.form.get("provinceData").valueChanges.debounceTime(700).subscribe(
			(data)=>{console.log(data);
				this.listAmphur(data);
				console.log(this.amphurData)}
			); 
  	}

	ionViewWillEnter() {
		console.log('ionViewDidLoad RegisterPage');
		this.navBar._mode='ios';
	}

	goBack(){
		//console.log(this.provinceData);
		this.navCtrl.pop();
	}

	listProvince(){
		this.fromService.getProvince().subscribe(
			(data)=>{
				this.proviceList=data;
				//console.log(this.proviceList);
			},(err)=>{
				console.log(err);
			});
	}
	listAmphur(val){
		this.fromService.getAmphur(val).subscribe(
			(data)=>{
				this.amphurList=data;
				console.log('/////////////////////');
				console.log(this.amphurList);
			},(err)=>{
				console.log(err);
			});
	}

	register(){
	  	console.log("register");
	    this.registerCredentials.password = Md5.hashAsciiStr(this.registerCredentials.password).toString();
	    if(this.registerCredentials.uid ==''){
			console.log('gen uid');
			this.registerCredentials.uid = Md5.hashAsciiStr(this.registerCredentials.username).toString();
	    }
    	this.registerCredentials.amphur_id = this.amphurData;
    	if(this.form.get("provinceData").value == -1){
    		this.registerCredentials.province_id = 0;
    	}
    	else{
    		this.registerCredentials.province_id = this.form.get("provinceData").value;
		}
	    this.sharedData.registerCredentials = this.registerCredentials;
	    this.authen.register().subscribe(success => {
			if (success) {
				console.log("true")
				this.registerCredentials = this.sharedData.clearRegisterData();
				this.navCtrl.popToRoot();
			}else {
		       console.log("false")
		       this.sharedData.clearRegisterData();
		       this.registerCredentials.password =this.sharedData.registerCredentials.password;
			}
		},
		error => {
			console.log("error")
		});
	}

	showPopup(title, text) {
	    let alert = this.alertCtrl.create({
			title: title,
			subTitle: text,
			buttons: [
		        {
					text: 'OK',
					handler: data => {
			            if (this.createSuccess) {
			              this.navCtrl.popToRoot();
		            	}
		          	}
		        }
	      	]
	    });
	    alert.present();
	}

}
