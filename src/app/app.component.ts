import { Component,ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { NotifyPage } from '../pages/notify/notify';
import { ProfilePage } from '../pages/profile/profile';
import { MyNotifyManagePage } from '../pages/my-notify-manage/my-notify-manage';
import { MyInterestingPage } from '../pages/my-interesting-page/my-interesting-page';
import { SettingPage } from '../pages/setting/setting';

import { RulePage } from '../pages/rule/rule';

import { SharedData } from '../providers/shared-data/shared-data';
import { AuthService } from '../providers/auth-service/auth-service';

//import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
  firstpage:any = this.rootPage;
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
    this.pages=[{title:"home",page:TabsPage},
                {title:"profile",page:ProfilePage},
                {title:"notifyManager",page:MyNotifyManagePage},
                {title:"wantTo",page:MyInterestingPage},
                {title:"createNotify",page:NotifyPage},
                {title:"rule",page:RulePage},
                {title:"setting",page:SettingPage}
                //{title:"เกี่ยวกับ",page:null}];
               ]
             }
  openPage(page){
    if(page.page != null){
      console.log(page)
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

        this.nav.setRoot(LoginPage,{data:"logout"});
      }
    },(err)=>{
              console.log(err)
            });
  }

}