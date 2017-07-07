import { Component, ViewChild } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams,Platform,Navbar,LoadingController, Loading } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { FormGroup,FormControl } from '@angular/forms';
import { SharedData } from '../../providers/shared-data/shared-data';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { FromServiceProvider } from '../../providers/from-service/from-service';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { HistoryPage } from '../history/history';
import { CommentPage } from '../comment/comment';
import 'rxjs/add/operator/debounceTime';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
	@ViewChild('navBar') navBar: Navbar;
	loading: Loading;
	lastImage: string = "";
	base64Image:boolean = false;
	finish = false;
	edit:boolean = false;
	editImage:boolean = false;
	data:any;

	defaultImage = 'assets/pic/person.png';
	image = 'http://'+this.sharedData.ip_local +'/giveAndShare/uploads/';
	offset = 0;

	form =new FormGroup({
		provinceData:new FormControl(this.sharedData.province_id)
	})

	proviceList:any;
	amphurList:any;

	editdata:any={
			    	name: this.sharedData.name,
			  		surname: this.sharedData.surname,
			  		email: this.sharedData.email,
			  		tel: this.sharedData.tel,
			  		province_id: this.sharedData.province_id,
			  		amphur_id: this.sharedData.amphur_id,
			  		province_name:this.sharedData.province_name,
			  		amphur_name:this.sharedData.amphur_name,
			  		avatar: this.sharedData.avatar,
	    	}

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public sharedData: SharedData,
				public dataService: DataServiceProvider,
				private filePath: FilePath,
			    private camera:Camera,
			    private transfer:Transfer,
			    private platfrom:Platform,
			    private file:File,
			    public loadingCtrl: LoadingController,
			    public alertCtrl:AlertController,
			    public fromService :FromServiceProvider
			    ) {
		this.listProvince();
		this.form.get("provinceData").valueChanges.debounceTime(700).subscribe(
			(data)=>{console.log(data);
				this.listAmphur(data);
				console.log(this.editdata.amphur_name)}
			);
	}

	ionViewWillEnter() {
	console.log('ionViewDidLoad ProfilePage');
	this.navBar._mode='ios';
	this.updateSharedData();
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
    gotoComment(){
      this.navCtrl.push(CommentPage,{"data":this.data,"edit_mode":false});
    }
    gotoHistory(){
    	this.navCtrl.push(HistoryPage,{"data":this.data})
    }
  	goBack(){
	  	this.navCtrl.popToRoot();
	    this.navCtrl.setRoot(TabsPage);
	}

	editMode(){
		this.edit = true;
	}
	viewMode(){
		
		this.editdata={
			    	name: this.sharedData.name,
			  		surname: this.sharedData.surname,
			  		email: this.sharedData.email,
			  		tel: this.sharedData.tel,
			  		province_id: this.sharedData.province_id,
			  		amphur_id: this.sharedData.amphur_id,
			  		province_name:this.sharedData.province_name,
			  		amphur_name:this.sharedData.amphur_name,
			  		avatar: this.sharedData.avatar,
	    	}

	    this.edit = false;
	}

	accessGallery(sourceType){
	  var options = {
	    quality: 100,
	    sourceType: sourceType,
	    saveToPhotoAlbum: false,
	    destinationType: 2,
	    correctOrientation: true,

	  };
	  this.loading = this.loadingCtrl.create({
	    content: 'loading...',
	  });
	  this.loading.present();
	  this.camera.getPicture(options).then((imagePath) => {
	    if (this.platfrom.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
	      this.filePath.resolveNativePath(imagePath)
	        .then(filePath => {
	          console.log(filePath)
	          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
	          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
	          this.base64Image=true;
	          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
	          this.editImage=true;
	          this.loading.dismiss();
	        });
	    } else {
	    		console.log('wtf3')
	          var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
	          var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
	          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
	          this.editImage=true;
	          this.loading.dismiss();
	    }
	  }, (err) => {
	  	this.editImage = false;
	    this.loading.dismiss();
	  });
	}
	private createFileName() {
		var d = new Date(),
		n = d.getTime(),
		newFileName =  n + ".jpg";
		return newFileName;
	}
	private copyFileToLocalDir(namePath, currentName, newFileName) {
		this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
		  this.lastImage = newFileName;
		this.loading.dismiss();
		}, error => {
		  this.loading.dismiss();
		  this.showPopup('Error while storing file.','');
		});
	}
	public pathForImage(img) {
		if (img === null) {
		  return '';
		} else {
		  return cordova.file.dataDirectory + img;
		}
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
	    'user':this.sharedData.username,
		'mode':'avatar'}
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
	  }, err => {
	    console.log(err);
	      this.loading.dismiss();
	      this.finish=true;
	  });

	  }
	  updateSharedData(){
	  	this.dataService.view_profile(this.sharedData.username).subscribe(
	  		(data)=>{
    			this.data=data;
    			this.sharedData.name = this.data.name
    			this.sharedData.surname = this.data.surname
    			this.sharedData.tel = this.data.tel
    			this.sharedData.email = this.data.email
    			this.sharedData.avatar = this.data.avatar
    			this.sharedData.amphur_id = this.data.amphur_id
    			this.sharedData.province_id = this.data.province_id
    			this.sharedData.amphur_name = this.data.AMPHUR_NAME
    			this.sharedData.province_name = this.data.PROVINCE_NAME
    			this.sharedData.image ='http://'+this.sharedData.ip_local +
					   									'/giveAndShare/uploads/'+ this.sharedData.username+ 
					   									'/avatar/'+	this.sharedData.avatar;
    			this.viewMode();
    			console.log(data);

    		},
    		(err)=>{
    			this.data=err;
				console.log(err);
    		});


	  }
	  public save(){
	  	if(this.lastImage != 'person'){
	  		this.uploadImage();
	  	}
	  	this.editdata.province_id = this.form.get("provinceData").value;
	  	if(this.editdata.province_id==0){
	  		this.editdata.amphur_id=0;
	  	}
	  	this.dataService.update(this.sharedData.username,
	  							this.editdata.name,
	  							this.editdata.surname,
	  							this.editdata.email,
	  							this.editdata.tel,
	  							this.editdata.province_id,
	  							this.editdata.amphur_id,
	  							this.editdata.avatar,
	  							this.lastImage
	  							).subscribe(success=>{
	  								console.log(success);
	  								if(success){
	  									this.updateSharedData();
	  								}
	  							}
	  							);
	  }
}
