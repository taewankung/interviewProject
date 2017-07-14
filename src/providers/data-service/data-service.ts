import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions } from '@angular/http';
import { SharedData } from '../shared-data/shared-data';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataServiceProvider {
	private registerURI: string  = "http://"+this.sharedData.ip_local+"/giveAndShare/manage-data.php";
	private body:string="";
	private profile:any;
	public success:boolean;
	//public data:any;
	public response: JSON;
	public header: Headers = new Headers(
                    { 'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
                    });
  	public requestOpt: RequestOptions = new RequestOptions(
                    { headers: this.header});

	constructor(public http: Http,
				  public sharedData:SharedData
				  ) {
		console.log('Hello DataServiceProvider Provider');
	}

	view_profile(username){
		return Observable.create(observer =>{
			this.body = "key=view_profile"+
						"&username=" + username;
			console.log(this.body)
			this.http.post(this.registerURI,
						   this.body,
						   this.requestOpt).subscribe((data)=>{
						   		
						   		this.response = data.json();
						   		console.log("??");
						   		if(data.status===200){
						   			//console.log(data);
						   			if(this.response["message"]=='Success'){
						   				this.profile = this.response["data"]
						   				observer.next(this.profile);
						   				observer.complete();
						   			}
						   		}
						   },(err)=>{
						   		console.log(err);
						   });
		},(err)=>{
			console.log(err)
			}
		);
	}

	update(username,name,surname,email,tel,province_id,amphur_id,avatar,image){
		return Observable.create((observer)=>{
			this.body = "key=updateProfile"+
						"&username="+ username +
						"&name="+ name +
						"&surname="+ surname +
						"&email="+ email +
						"&tel="+ tel +
						"&province_id="+ province_id+
						"&amphur_id="+ amphur_id+
						"&avatar="+ avatar+
						"&image="+ image;

		    this.http.post(this.registerURI,
		    				this.body,
		    				this.requestOpt
		    				).subscribe((data)=>{
		    					if(data.status===200){
		    						this.response = data.json()
		    						if(this.response["message"]=="Success"){
		    							console.log("Success");
		    							this.success = true;
		    							observer.next(this.success);
		    							observer.complete();
		    						}
		    						else{
		    							console.log("Fails");
		    							console.log(data);
		    							this.success = false;
		    							observer.next(this.success);
		    							observer.complete();
		    						}
		    					}
		    					else{
		    						console.log("status is not 200");	
		    					}
		    				},
		    				(err)=>{
		    					console.log(err);
		    				}
		    			);
		},(err)=>{console.log(err)});
	}

}
