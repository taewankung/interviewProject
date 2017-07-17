import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController, NavParams, MenuController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
//import { HomePage } from '../home/home';
import { AuthService } from '../../providers/auth-service/auth-service';
import { SharedData } from '../../providers/shared-data/shared-data';
import { Md5 } from 'ts-md5/dist/md5';
import { FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username:FormControl;
  password:FormControl; 
  temp_char:'';
  userErrorText='';
  passErrorText='';
  parameter:any;
  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public menuCtrl:MenuController,
  			  public authen:AuthService,
          public sharedData:SharedData,
          public alertCtrl:AlertController,
          public storage: Storage) {
    this.parameter =  navParams.get("data");
    this.username = new FormControl;
    this.password = new FormControl;
    if(this.parameter=="logout"){
      this.storage.remove('username');
      this.storage.remove('password');
      console.log('????')
    }
    this.storage.get('username').then(username=>{
        // if(val){
        //     console.log('not empty '+val);
        //   }
        console.log(username)
        if(username)
          this.username.setValue(username);
        this.storage.get('password').then(password=>{
          this.password.setValue(password);
          console.log(password);
          if(password)
            this.login(true);
            // if(val){
            //     console.log('password not empty '+ val);
            //   }
        });
    });
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.menuCtrl.enable(false);
  }
  ionViewWillEnter(){
  	this.menuCtrl.enable(false);
  }
  ionViewWillLeave(){
    console.log('adsfasdfa');
    this.menuCtrl.enable(true);
  }

  login(remember){
  	console.log("login");
    //console.log(this.authen.login());
    if(!remember){
      this.password.setValue(Md5.hashStr(this.password.value));
    }
    this.sharedData.loginCredentials.username = this.username.value;
    this.sharedData.loginCredentials.password = this.password.value;
    this.authen.login().subscribe(
      (success)=>{
        if(success=="pass"){
          this.storage.set('username', this.username.value);
          this.storage.set('password', this.password.value);


          console.log("login compleate");
          this.storage.get('password').then(val=>{
            console.log(val);
          })
          //this.menuCtrl.enable(true);
          this.navCtrl.setRoot(TabsPage);
        }
        else if(success=="no_user"){
          this.showPopup("ไม่สามารถเข้าสู่ระบบได้","โปรดตรวจสอบ username และ password ของท่าน")
          this.password.setValue('');
          this.sharedData.loginCredentials.password = this.password.value;
          console.log("login fail");
        }
        else if(success=="no_connect"){
          this.showPopup("ไม่สามารถเข้าสู่ระบบได้","โปรดตรวจสอบ การเชื่อมต่อ Internet ของท่าน")
          this.password.setValue('');
          this.sharedData.loginCredentials.password = this.password.value;
          console.log("login fail");
        }
        else if(success=="error"){
          this.showPopup("ไม่สามารถเข้าสู่ระบบได้","เกิดข้อผิดพลาดกับระบบ")
          this.password.setValue('');
          this.sharedData.loginCredentials.password = this.password.value;
          console.log("login fail");
        }


      },
      (err)=>{
          this.showPopup("ไม่สามารถเข้าสู่ระบบได้","เกิดข้อผิดพลาดกับระบบ")
          this.password.setValue('');
          this.sharedData.loginCredentials.password = this.password.value;
          console.log("login fail");
        console.log(err)
      });
  }

  register(){
  	console.log("register");
  	this.navCtrl.push(RegisterPage);
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
    title: title,
    subTitle: text,
    buttons: [
          {
        text: 'OK',
        handler: data => {
                  this.navCtrl.popToRoot();
              }
          }
        ]
    });
    alert.present();
  }
  // errorInput(){
  //    if(this.username.hasError('required') && this.username.touched){
  //     this.userErrorText="* Username is required"
  //    }     
  //    else if(!this.username.hasError('required') && this.username.value != '' && !this.username.valid && this.username.touched){
  //           this.userErrorText="* Username has special character or other language";
  //         }
  // }
}
