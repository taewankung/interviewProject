import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule} from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';//1
import { LoginPage } from '../pages/login/login';//2
import { RegisterPage } from '../pages/register/register';//3
import { NotifyPage } from '../pages/notify/notify';//4
import { TabsPage } from '../pages/tabs/tabs';//5
import { ProfilePage } from '../pages/profile/profile';//6
import { GivePage } from '../pages/give/give';//7
import { ReceivePage } from '../pages/receive/receive';//8
import { LookProfilePage } from '../pages/look-profile/look-profile';//9
import { LookNotifyPage } from '../pages/look-notify/look-notify';//10
import { CommentPage } from '../pages/comment/comment';//11
import { HistoryPage } from '../pages/history/history';//12
import { MyManagePage } from '../pages/my-manage/my-manage';//13
import { MyNotifyManagePage } from '../pages/my-notify-manage/my-notify-manage';//14
import { MyInterestingPage } from '../pages/my-interesting-page/my-interesting-page';
import { RulePage } from '../pages/rule/rule';

import { SharedData } from '../providers/shared-data/shared-data';
import { AuthService } from '../providers/auth-service/auth-service';
import { Autosize } from '../directives/autosize/autosize';
import { NotificationProvider } from '../providers/notification/notification';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FromServiceProvider } from '../providers/from-service/from-service';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { InterestingProvider } from '../providers/interesting/interesting';
import { CommentProvider } from '../providers/comment/comment';


import { Ionic2RatingModule } from 'ionic2-rating';
import { EmailValidateDirective } from '../directives/email-validate/email-validate';
import { UserValidateDirective } from '../directives/user-validate/user-validate';
import { EqualValidatorDirective } from '../directives/equal-validator/equal-validator';
import { PhoneValidateDirective } from '../directives/phone-validate/phone-validate';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    NotifyPage,
    TabsPage,
    ProfilePage,
    ReceivePage,
    GivePage,
    LookProfilePage,
    LookNotifyPage,
    CommentPage,
    HistoryPage,
    MyManagePage,
    MyNotifyManagePage,
    MyInterestingPage,
    RulePage,
    Autosize,
    EmailValidateDirective,
    UserValidateDirective,
    EqualValidatorDirective,
    PhoneValidateDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    LazyLoadImageModule,
    Ionic2RatingModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    NotifyPage,
    TabsPage,
    ReceivePage,
    GivePage,
    LookProfilePage,
    LookNotifyPage,
    ProfilePage,
    CommentPage,
    HistoryPage,
    MyManagePage,
    MyNotifyManagePage,
    MyInterestingPage,
    RulePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SharedData,
    FileChooser,
    AuthService,
    HttpModule,
    NotificationProvider,
    File,
    Transfer,
    FilePath,
    Camera,
    FromServiceProvider,
    DataServiceProvider,
    InterestingProvider,
    CommentProvider
  ]
})
export class AppModule {}
