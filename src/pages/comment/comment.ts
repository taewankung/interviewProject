import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController,Navbar, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { SharedData } from '../../providers/shared-data/shared-data';
import { FormGroup,FormControl } from '@angular/forms';
import { CommentProvider } from '../../providers/comment/comment';
//import 'rxjs/add/operator/debounceTime';
/**
 * Generated class for the CommentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
	@ViewChild('navBar') navBar: Navbar;
	form =new FormGroup({
		message:new FormControl(""),
		point:new FormControl(0)
	})
  data:any;
	//point:number=0;
	rate:number=0;
	pointEnable:boolean=true;
	commentList:any = [];
  delight_point=0;
  undelight_point=0;
  rating_point:number=0;
  owner:boolean=false;

	btnEnable:boolean=true;
	commentEnable:boolean=false;
	statusPoint:string="";
  edit_mode:boolean=true;
  	constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public dataService: DataServiceProvider,
    		  public sharedData: SharedData,
          public commentPro:CommentProvider) {
  	}

	ionViewWillEnter(){
		this.navBar._mode = 'ios';
		console.log(this.form.value.point)
    this.data = this.navParams.get("data")
    this.get_comment(this.data.id);
    if(!this.navParams.get("edit_mode")){
      this.edit_mode = this.navParams.get("edit_mode");
    }
    //console.log(this.data) 
	}
  	
  	ionViewDidLoad() {
    	console.log('ionViewDidLoad CommentPage');
      console.log(this.rating_point);
  	}

  	onModelChange(somthing){
  		console.log(somthing)
  	}

  	enableComment(){
  		this.btnEnable = false;
  		this.commentEnable = true;
  	}

    disableComment(){
      this.commentEnable = false;
      this.btnEnable = true;
    }

    comment(){
      this.disableComment();
      //console.log("??")
      this.commentPro.comment(this.data.id,this.form.value.message,this.form.value.point).subscribe(
        (success)=>{
          if(success){
          console.log("success");
          this.get_comment(this.data.id);
        }
        else{
          console.log("not success");
        }
      },
        (err)=>{
          console.log(err)}
      );

    }

    get_comment(user_id){
      console.log('//////id/////');
      console.log(user_id)
      this.commentPro.get_comment(user_id).subscribe(
        (success)=>{
          this.commentList = success;
          this.delight_point = 0;
          this.undelight_point = 0;
          for(let data of this.commentList){
            console.log(data)
            if(data["comment_point"]==1){
              this.delight_point+=1;
            }
            else if(data["comment_point"]==-1){
              this.undelight_point+=1;
            }
          }
          this.rating_point=this.delight_point/(this.undelight_point+this.delight_point);
          if(this.undelight_point==0 && this.delight_point==0 ){
            this.rate=0
          }
          else if(this.rating_point< 0.16){
            this.rate=0
          }
          else if(this.rating_point< 0.33){
            this.rate=1
          }
          else if(this.rating_point< 0.49){
            this.rate=2
          }
          else if(this.rating_point< 0.65){
            this.rate=3
          }
          else if(this.rating_point< 0.90){
            this.rate=4
          }
          else {
            this.rate=5
          }
        },
        (err)=>{
          console.log(err);
        })
    }
    
  	enablePoint(){
  		this.pointEnable = true;
  	}

  	disablePoint(){
  		this.pointEnable = false;
  	}


}
