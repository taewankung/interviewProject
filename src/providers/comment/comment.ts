import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions } from '@angular/http';
import { SharedData } from '../shared-data/shared-data';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the CommentProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CommentProvider {
    private commentURI: string  = "http://"+this.sharedData.ip_local+"/giveAndShare/comment_manage.php";
    private body:string="";
    public response: JSON;
    public header: Headers = new Headers(
                    { 'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
                    });
    public requestOpt: RequestOptions = new RequestOptions(
                    { headers: this.header});


  constructor(public http: Http,public sharedData:SharedData) {
    console.log('Hello CommentProvider Provider');
  
  }

  comment(user_id,message,point){

  	return Observable.create(
  		(obsever)=>{
         this.body = "key=comment"+
            "&comment_user_id=" + this.sharedData.id +
            "&comment_message=" + message +
            "&recieve_user_id=" + user_id +
            "&comment_point=" +point;
      if(message!=""){
        this.http.post(this.commentURI,
               this.body,
               this.requestOpt).subscribe(
               (success)=>{
                 console.log(success)
                 obsever.next(true);
                 obsever.complete();
               },
               (err)=>{
                 obsever.next(false);
                 obsever.complete();
                 console.log(err)
               }
               );
      }
      else{
        obsever.next(false);
        obsever.complete();
      }
  		},
  		(err)=>{
        console.log("Error CommentProvider");
  		}
  		)
  }

  get_comment(user_id){
    return Observable.create(
      (obsever)=>{
        this.body = "key=view_comment"+
                    "&recieve_user_id="+user_id;

        this.http.post(this.commentURI,
                       this.body,
                       this.requestOpt).subscribe(
          (success)=>{

            // obsever.next(success);
            // obsever.complete();
            this.response = success.json();
            if(this.response["message"]=="Success"){
              obsever.next(this.response["data"]);
              obsever.complete();
              console.log(success);
            }
            else if(this.response["message"]=="no user"){
              obsever.next([]);
              obsever.complete();
              //console.log(success);
            }
            else{
              obsever.next(false)
              obsever.complete();
              console.log("false Post");
            }

          },
          (err)=>{
            console.log(err);
          });
      },
      (err)=>{
        console.log(err);
      }
    )
  }
}
