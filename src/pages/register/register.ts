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
	templateUrl: 'register2.html',
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

	profileForm=new FormGroup({
		uid: new FormControl(''),
		username: new FormControl(''),
		password: new FormControl(''),
		validatePass: new FormControl(''),
		name: new FormControl(''),
		surname: new FormControl(''),
		tel: new FormControl(''),
		email: new FormControl(''),
		province_id: new FormControl(-1),
		amphur_id: new FormControl(0),
	})
	
  	registerCredentials:any = { 
						uid:'',
						username: '',
						password: '',
						validatePass: '',
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
		// this.profileForm.get("username").valueChanges.debounceTime(1000).subscribe(
		// 	(data)=>{console.log(data);
		// 		//this.listAmphur(data);
		// 		this.checkUser();
		// 		console.log(data)
		// 		if(data){
		// 			this.check="true";
		// 		}
		// 		else{
		// 			this.check="false";
		// 		}
		// 		console.log("check="+this.check);
		// 	}

			// );
  	}

	ionViewWillEnter() {
		console.log('ionViewDidLoad RegisterPage');
		this.navBar._mode='ios';
	}

	goBack(){
		//console.log(this.provinceData);
		this.navCtrl.pop();
	}

	checkUser(){
		this.authen.checkUser(this.profileForm.get("username").value).subscribe(
			(success)=>{
				console.log(success);
				// if(success){
				// 	console.log(this.profileForm.get("username").valid)
				// }
			},(err)=>{console.log(err)}
			)
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
	    this.registerCredentials.password = Md5.hashAsciiStr(this.profileForm.get("password").value).toString();


	    if(this.registerCredentials.uid ==''){
			console.log('gen uid');
			this.registerCredentials.uid = Md5.hashAsciiStr(this.profileForm.get("username").value).toString();
	    }
	    this.registerCredentials.username = this.profileForm.get("username").value
	    this.registerCredentials.name = this.profileForm.get("name").value
	    this.registerCredentials.surname = this.profileForm.get("surname").value
	    this.registerCredentials.email = this.profileForm.get("email").value
	   	this.registerCredentials.tel = this.profileForm.get("tel").value
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
				this.profileForm.setValue({uid:'',
										  username:'',
										  password:'',
										  validatePass:'',
										  name:'',
										  surname:'',
										  tel:'',
										  email:'',
										  province_id:-1,
										  amphur_id:0
										});
				this.navCtrl.popToRoot();
			}else {
		       console.log("false")
		       console.log(success)
		       	console.log(success["message"])
		       	this.showError("Username นี้มีผู้ใช้งานแล้วแล้ว","โปรดเปลียน username ด้วย");
   				this.registerCredentials = this.sharedData.clearRegisterData();
   				this.profileForm.setValue({uid:'',
							  username:'',
							  password:'',
							  validatePass:'',
							  name:'',
							  surname:'',
							  tel:'',
							  email:'',
							  province_id:-1,
							  amphur_id:0
							});
		       //this.registerCredentials.password.setValue(this.sharedData.registerCredentials.password);
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

	showError(title, text) {
	    let alert = this.alertCtrl.create({
			title: title,
			subTitle: text,
			buttons: [
		        {
					text: 'OK',
		        }
	      	]
	    });
	    alert.present();
	}

}
