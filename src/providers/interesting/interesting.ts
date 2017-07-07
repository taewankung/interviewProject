import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions } from '@angular/http';
import { SharedData } from '../shared-data/shared-data';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
/*
  Generated class for the InterestingProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class InterestingProvider {

	private interestURI: string  = "http://"+this.sharedData.ip_local+"/giveAndShare/interesting_manage.php";
	private body:string="";
	public success:boolean;
	//public data:any;
	public response: JSON;
	public header: Headers = new Headers(
                    { 'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
                    });
  	public requestOpt: RequestOptions = new RequestOptions(
                    { headers: this.header});

	constructor(public http: Http,public sharedData:SharedData) {
		console.log('Hello InterestingProvider Provider');
	}

	update(notify_id){
		return Observable.create(
			(observer)=>{
				this.body = "key=update_interesting_point"+
					"&notification_id=" + notify_id;
				this.http.post(this.interestURI,
							   this.body,
							   this.requestOpt).subscribe((data)=>{
						   		console.log(data)
						   		this.response = data.json();
						   		if(this.response["message"]=="Success"){
						   			console.log("/////OK//////");
						   			observer.next(this.response);
						   			console.log(this.response);
						   			observer.complete();
						   		}
						   	},(err)=>{
						   		observer.next(false);
						   		observer.complete();
						   		console.log(err)});
			},(err)=>{
				console.log(err)
			});
	}
	
	view_interesting(notify_id){
		return Observable.create(
			(observer)=>{
				this.body = "key=view_interesting"+
					"&notify_id=" + notify_id+
					"&user_id_recieve=" + this.sharedData.id;
				console.log(this.body);
				this.http.post(this.interestURI,
							   this.body,
							   this.requestOpt).subscribe((data)=>{
						   		console.log(data)
						   		this.response = data.json();
						   		if(this.response["message"]=="Success"){
						   			console.log("/////OK//////");
						   			observer.next(this.response);
						   			observer.complete();
						   		}
						   	},(err)=>{
						   		observer.next(false);
						   		console.log(err)});
			},(err)=>{
				console.log(err)
			});
	}

	check(notify_id){
		return Observable.create(
			(observer)=>{
				this.body = "key=check_interest"+
					"&notify_id=" + notify_id+
					"&user_id_send=" + this.sharedData.id;
				console.log(this.body);
				this.http.post(this.interestURI,
							   this.body,
							   this.requestOpt).subscribe((data)=>{
						   		console.log(data)
						   		this.response = data.json();
						   		if(this.response["message"]=="Success"){
						   			console.log("/////OK//////");
						   			observer.next(this.response);
						   			observer.complete();
						   		}
						   	},(err)=>{
						   		observer.next(false);
						   		console.log(err)});
			},(err)=>{
				console.log(err)
			});
	}

	send(message,recieve_id,notify_id){
		return Observable.create(
			(observer)=>{
				this.body = "key=send"+
					"&notify_id=" + notify_id+
					"&user_id_send=" + this.sharedData.id+
					"&user_id_recieve="+ recieve_id+
					"&post_data=" + message;
				this.http.post(this.interestURI,
						   this.body,
						   this.requestOpt).subscribe((data)=>{
						   		console.log(data)
						   		this.response = data.json();
						   		
						   		if(data.status===200){
						   			//console.log(data);
						   			if(this.response["message"]=='Success'){
						   				observer.next(true);
						   				observer.complete();
						   			}
						   		}
				},err=>{
					observer.next(false);
   					observer.complete();

				}
			);
		});
	}

	delete(recieve_id,notify_id){
		return Observable.create(
			(observer)=>{
				this.body = "key=delete"+
					"&notify_id=" + notify_id+
					"&user_id_send=" + this.sharedData.id+
					"&user_id_recieve="+ recieve_id;
				this.http.post(this.interestURI,
						   this.body,
						   this.requestOpt).subscribe((data)=>{
						   		console.log(data)
						   		this.response = data.json();
						   		
						   		if(data.status===200){
						   			//console.log(data);
						   			if(this.response["message"]=='Success'){
						   				observer.next(true);
						   				observer.complete();
						   			}
						   		}
				},err=>{
					observer.next(false);
   					observer.complete();

				}
			);
		});
	}
}

