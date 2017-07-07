import { Component,ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { NotifyPage } from '../pages/notify/notify';
import { ProfilePage } from '../pages/profile/profile';
import { MyNotifyManagePage } from '../pages/my-notify-manage/my-notify-manage';

import { SharedData } from '../providers/shared-data/shared-data';
import { AuthService } from '../providers/auth-service/auth-service';

//import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
  pages: Array<{title: string, page:any}>;

  defaultImage = 'assets/pic/person.png';
  image = 'http://'+this.sharedData.ip_local +'/giveAndShare/uploads/';
  offset = 0;
  
  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              public sharedData:SharedData,
              public authen:AuthService){

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.pages=[{title:"ข้อมูลส่วนตัว",page:ProfilePage},
                {title:"ประกาศของฉัน",page:MyNotifyManagePage},
                {title:"หน้าแรก",page:TabsPage},
                {title:"ประกาศ",page:NotifyPage},
                //,{title:"การตั้งค่า",page:null},
                //{title:"เกี่ยวกับ",page:null}];
               ]}
  openPage(page){
    if(page.page != null){
      this.nav.push(page.page);
    }
    else{
      console.log(page.title);
    }
  }

  logout(){
    console.log("logout");
    this.authen.logout().subscribe(success=>{
      if(success){
        this.nav.setRoot(LoginPage);
      }
    },(err)=>{
              console.log(err)
            });
  }

}