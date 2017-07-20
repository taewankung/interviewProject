import { Component,ViewChild } from '@angular/core';
import { IonicPage,AlertController, Navbar , Platform, NavController, NavParams,LoadingController, Loading } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { SharedData } from '../../providers/shared-data/shared-data';
import { TabsPage } from '../tabs/tabs';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
/**
 * Generated class for the NotifyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-notify',
  templateUrl: 'notify.html',
})



export class NotifyPage {
  @ViewChild('navBar') navBar: Navbar;
	notifyTitle:string='';
	dateNotify:Date;
	detailNotify:string='';
  detailText:string='';
  addressNotify:string='';
	checkedIdx=0;
  selectType="เลือกประเภท";
	type = '';
  finish=false;
  
  image_uri:string = '';
  image_path:string ='';
  base64Image:boolean = false;
  enableDetail=false;
  disableBtn=true;
  uploadText:any;
  show_lastimage:string;
  lastImage: string = null;
  file_path:string='';
  file_name:string='';
  errorText:string='';
  loading: Loading;

  // enableBtn=Observable.create((observer)=>{
  //                     if(this.notifyTitle==''){
  //                       observer.next(false);
  //                       observer.complete(); 
  //                     }else{
  //                       observer.next(true);
  //                       observer.complete(); 
  //                     }

  // },(err)=>{});

  typeObserver:any = Observable.create((observer)=>{
                      if(this.type=='give'){
                        this.enableDetail=true;
                        this.disableBtn=false;
                        this.detailText='รายละเอียด';
                        if(this.notifyTitle==''){
                           this.disableBtn=true;
                        }else{
                          this.disableBtn=false;
                        }
                        this.selectType="ประเภท";
                        observer.next(this.enableDetail);
                        observer.complete(); 
                      }
                      else if(this.type=='recieve'){
                        this.enableDetail=true;
                        this.disableBtn=false;
                        this.detailText='เหตุผล';
                        if(this.notifyTitle==''){
                           this.disableBtn=true;
                        }else{
                          this.disableBtn=false;
                        }
                        this.selectType="ประเภท";
                        observer.next(this.enableDetail); 
                        observer.complete();
                      }
                      
                      else if(this.type=='support'){
                        this.enableDetail=true;
                        this.disableBtn=false;
                        this.detailText='เหตุผล';
                        if(this.notifyTitle==''){
                           this.disableBtn=true;
                        }else{
                          this.disableBtn=false;
                        }
                        this.selectType="ประเภท";
                        observer.next(this.enableDetail); 
                        observer.complete();
                      }
                      else if(this.type==''){
                        this.enableDetail=false;
                        this.disableBtn=true;
                        this.selectType="เลือกประเภท";
                        //console.log(this.enableDetail);
                        observer.next(this.enableDetail);
                        observer.complete();
                      }

                     });
	notifyType=0;
	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public notifyPro: NotificationProvider,
        public alertCtrl:AlertController,
        private fileChooser: FileChooser,
        private filePath: FilePath,
        private camera:Camera,
        private transfer:Transfer,
        public sharedData:SharedData,
        private platfrom:Platform,
        private file:File,
        public loadingCtrl: LoadingController) {
	}

	ionViewWillEnter() {
  	console.log('ionViewDidLoad NotifyPage');
    this.navBar._mode='ios'; 
	}

  accessGallery(sourceType){
      var options = {
        quality: 100,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        destinationType: 2,
        correctOrientation: true
      };
      this.loading = this.loadingCtrl.create({
        content: 'loading...',
      });
      this.loading.present();

      // Get the data of an image
      this.camera.getPicture(options).then((imagePath) => {
        // Special handling for Android library
        console.log(imagePath);
        console.log('///////xxx////////');
        if (this.platfrom.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
          this.filePath.resolveNativePath(imagePath)
            .then(filePath => {
              let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
              let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
              this.base64Image=true;

              console.log(currentName);
              console.log(correctPath);
              console.log('////////////');

              this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
              this.loading.dismiss();

            });
        } else {
              var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
              var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
              console.log(currentName);
              console.log(correctPath);
              this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
              this.loading.dismiss();
        }
      }, (err) => {
        this.loading.dismiss();
        //this.showPopup('Error while selecting image.','');
      });
      }
      // Create a new name for the image
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    // this.show_lastimage = cordova.file.dataDirectory + newFileName;
    // console.log(this.show_lastimage);
    return newFileName;
  }
 
  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      // console.log(newFileName);
    this.loading.dismiss();
    }, error => {
      this.loading.dismiss();
      this.showPopup('Error while storing file.','');
    });
  }
// Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  goBack(){
  	this.navCtrl.popToRoot();
    this.navCtrl.setRoot(TabsPage);
  }
    
  create(){
  	if(this.type=='give'){
  		this.notifyType = 0;
  	}
  	else if(this.type=='recieve'){
  		this.notifyType = 1;
  	}

    this.dateNotify=new Date();
    let date = this.dateNotify.getUTCDate()
    let month = this.dateNotify.getUTCMonth()+1;
    let year = this.dateNotify.getUTCFullYear();
    let currentdate = year.toString()+'-' + month.toString() +'-'+date.toString();

    this.notifyPro.create(
      this.notifyTitle,
  		currentdate,
  		this.detailNotify,
  		this.notifyType,
      this.lastImage).subscribe((success)=>{
        if(success){
          console.log(this.detailNotify);
          if(this.lastImage!==null){
            this.uploadImage();
          }
          else{
            this.showPopup("สร้างประกาศสำเร็จ","");
            this.navCtrl.setRoot(TabsPage);
          }
  			}
  		  else{
          this.showPopup("เกิดข้อผิดพลาด","");
  				console.log("fail");
  			}
  		},
  		(err)=>{
        this.showPopup("เกิดข้อผิดพลาด","");
        console.log(err);
  		});

  }

  test(){
    console.log("??");

    this.dateNotify= new Date();
    // let date = this.dateNotify.getUTCDate()
    // let month = this.dateNotify.getUTCMonth()+1;
    // let year = this.dateNotify.getUTCFullYear();
    // let dmy = date.toString()+'-' + month.toString() +'-'+year.toString();
    //console.log(dmy);
    this.typeObserver.subscribe((data)=>{console.log(data)});
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
    title: title,
    subTitle: text,
    buttons: [
      {
        text: 'OK'
      }
    ]
    });
    alert.present();
  }

  public uploadImage() {
  var url = "http://" + this.sharedData.ip_local + "/giveAndShare/upload.php";
  var targetPath = this.pathForImage(this.lastImage);

  var filename = this.lastImage;
 
  var options = {
    fileKey: "file",
    fileName: filename,
    mimeType: "multipart/form-data",
    params : {'fileName': filename,
    'user':this.sharedData.username}
  };
 
  const fileTransfer: TransferObject = this.transfer.create();

  this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });
  this.loading.present();

  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    console.log(data);
      this.loading.dismiss();
      this.finish=true;
      this.showPopup("สร้างประกาศสำเร็จ","");
      this.navCtrl.setRoot(TabsPage);
    //this.showPopup('Image succesful uploaded.','');
  }, err => {
    console.log(err);

      this.loading.dismiss();
      this.finish=true;
    //this.showPopup('Error while uploading file.','');
  });

  }
}
