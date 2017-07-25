import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions } from '@angular/http';
import { SharedData } from '../shared-data/shared-data';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the FromServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FromServiceProvider {

  province:Array<string> = [];
  response:JSON;
  body:string="";
  URI:string="http://"+this.sharedData.ip_local+"/giveAndShare/province/localtion.php";
  public header: Headers = new Headers(
                    { 'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
                    });
  public requestOpt: RequestOptions = new RequestOptions(
                    { headers: this.header});
  
  constructor(public http: Http,public sharedData:SharedData) {
    //console.log('Hello FromServiceProvider Provider');
  }
  update_ip(){
		this.URI = "http://"+this.sharedData.ip_local+"/giveAndShare/province/localtion.php";
  }
  getProvince(){
  	return Observable.create((observer)=>{
		this.body = "key=province";
		this.http.post(this.URI,
					   this.body,
					   this.requestOpt
			).subscribe(
			(data)=>{
				this.response = data.json();
				//console.log(this.response);
				observer.next(this.response["data"]);
				observer.complete();
			},(err)=>{
				observer.next(err);
				observer.complete();
			}
		);
  	}); 
  }

  getAmphur(val){
  	  return Observable.create((observer)=>{
		this.body = "key=amphur"+
					"&val="+val;
		console.log(this.body)
		this.http.post(this.URI,
					   this.body,
					   this.requestOpt
			).subscribe(
			(data)=>{
				this.response = data.json();
				console.log(data);
				observer.next(this.response["data"]);
				observer.complete();
			},(err)=>{
				observer.next(err);
				observer.complete();
			}
		);
  	}); 
  }
}
