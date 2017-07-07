import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions } from '@angular/http';
import { SharedData } from '../shared-data/shared-data';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthSeviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
  	private registerURI: string  = "http://"+this.sharedData.ip_local+"/giveAndShare/manage-data.php";
  	private body:string="";
  	public response: JSON;
  	public check_regis:boolean;
  	public check_login:string;
  	public check_logout:boolean;
  	public header: Headers = new Headers(
                    { 'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
                    });
  	public requestOpt: RequestOptions = new RequestOptions(
                    { headers: this.header});
	constructor(public http: Http,
				  public sharedData:SharedData
				  ) {
	console.log('Hello AuthSeviceProvider Provider');
	}

	register(){
		console.log("registe Service");
		return Observable.create(observer =>{
			this.body = "key=create"+
						"&uid=" + this.sharedData.registerCredentials.uid.valueOf() +
		                "&username=" + this.sharedData.registerCredentials.username.valueOf() +
		                "&password=" + this.sharedData.registerCredentials.password.valueOf() +
		                "&name=" + this.sharedData.registerCredentials.name.valueOf() +
		                "&surname="+ this.sharedData.registerCredentials.surname.valueOf() +
		                "&tel=" + this.sharedData.registerCredentials.tel.valueOf() +
		                "&email=" + this.sharedData.registerCredentials.email.valueOf()+
		                "&class_id=2"+
		                "&province_id="+this.sharedData.registerCredentials.province_id.valueOf()+
		                "&amphur_id="+this.sharedData.registerCredentials.amphur_id.valueOf();

			this.http.post(this.registerURI,
						   this.body,
						   this.requestOpt).subscribe((data)=>{
						   	console.log(data);
						   	this.response=data.json();
						   	if(data.status===200){
						   		console.log(this.response);
						   		if(this.response["message"]=="Success"){
						   			console.log("register success")
						   			this.check_regis = true;
						   			observer.next(this.check_regis);
	        						observer.complete();
						   		}
						   		else{
						   			console.log("register false")
						   			this.check_regis = false;
						   			observer.next(this.check_regis);
	        						observer.complete();
						   		}
						   	}
						},(err)=>{
								console.log(err);
								console.log("register err");
								this.check_regis = false;
						   		observer.next(this.check_regis);
	        					observer.complete();
	        					});		
		});

	}
	login(){
		console.log("login Service");
		return Observable.create(observer =>{
		this.body = "key=login"+
		            "&username=" + this.sharedData.loginCredentials.username.valueOf() +
		            "&password=" + this.sharedData.loginCredentials.password.valueOf();
		console.log(this.body);
		this.http.post(this.registerURI,
					   this.body,
					   this.requestOpt).subscribe((data)=>{
					   	console.log(data);
					   	this.response=data.json();
					   	if(data.status===200){
					   		console.log(this.response);
					   		if(this.response["message"]=="Success"){
					   			console.log("login success")
					   			this.check_login = 'pass';
					   			this.sharedData.id = this.response["data"]["id"]
					   			this.sharedData.username=this.response["data"]["username"]
					   			this.sharedData.name=this.response["data"]["name"]
					   			this.sharedData.surname=this.response["data"]["surname"]
					   			this.sharedData.tel=this.response["data"]["tel"]
					   			this.sharedData.email=this.response["data"]["email"]
					   			this.sharedData.avatar=this.response["data"]["avatar"]
					   			this.sharedData.amphur_name=this.response["data"]["AMPHUR_NAME"]
					   			this.sharedData.province_name=this.response["data"]["PROVINCE_NAME"]
					   			this.sharedData.image ='http://'+this.sharedData.ip_local +
					   									'/giveAndShare/uploads/'+ this.sharedData.username+ 
					   									'/avatar/'+	this.sharedData.avatar;		   			

					   			console.log("???"+this.sharedData.amphur_name)
					   			observer.next(this.check_login);
	        					observer.complete();
					   		}
					   		else{
					   			console.log("login false")
					   			this.check_login = 'no_user';
					   			observer.next(this.check_login);
	        					observer.complete();
					   		}	
		        		}
					},(err)=>{
							console.log(err);
							console.log("login err");
							this.check_login="no_connect";
							observer.next(this.check_login);
	        				observer.complete();
							});
		});
	}
	logout(){
		console.log("logout");
		return Observable.create(observer =>{
				this.body = "key=logout"+
		            "&username=" + this.sharedData.loginCredentials.username.valueOf();
		        this.http.post(
		        			this.registerURI,
		        			this.body,
					   		this.requestOpt).subscribe(
					data=>{
					if(data.status===200){
		        		this.check_logout=true;
		        		this.response=data.json();
		        		if(this.response["message"]=="Success"){
		        			this.check_logout=true;
		        			console.log("Logout Service");
		        			observer.next(this.check_logout)
		        			observer.complete();
		        		}
		        		else{
		        			this.check_logout=false;
		        			console.log("Logout Fails");
		        			observer.next(this.check_logout)
		        			observer.complete();
		        		}

		        	}
		        },(err)=>{
		        	console.log(err)
		        		 }
		        );
			},
			(err)=>{
				console.log(err);
			}
		)
	}



}
