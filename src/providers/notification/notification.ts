import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions } from '@angular/http';
import { SharedData } from '../shared-data/shared-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NotificationProvider {
	private registerURI: string  = "http://"+this.sharedData.ip_local+"/giveAndShare/notify_manage.php";
	private response:JSON;
	public body="";
	public SearchData:Array<any>=[];
	public success:boolean;
	//private searchBool:boolean=false;
	public header: Headers = new Headers(
                    { 'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"
                    });
  	public requestOpt: RequestOptions = new RequestOptions(
                    { headers: this.header});
	constructor(public http: Http,
				public sharedData:SharedData) {
		console.log('Hello NotificationProvider Provider');
	}

	search(searchText){
		return this.SearchData.filter((item) => {
			 //console.log('********************')
			// console.log(item)
        return (item.username.toLowerCase().indexOf(searchText.toLowerCase()) > -1) || 
            	   (item.notifyTitle.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
        	});
        /////////////////////////////////////////////////////////////////////////////////////
        		// return Observable.create((observer)=>{
  //   		this.body = "key=search"+
		// 				"&username="+searchText.toString()+
		// 				"&title="+searchText.toString();
  //   		this.http.post(this.registerURI,
		//     				this.body,
		//     				this.requestOpt
		//     				).subscribe((data)=>{
		//     					if(data.status===200){
		//     						console.log(data)
		//     						this.response=data.json()
		//     						if(this.response["message"]=="Success"){
		//     							console.log("Success list")
		//     							//this.SearchData = datalist;
		//     							console.log(searchText)
		//     							this.SearchData = this.response["data"];
		//     							observer.next(this.response["data"]);
		//     							observer.complete();
		//     						}
		//     					}
		//     				},(err)=>{
		//     					console.log(err);
		//     				})
		//     			})
		///////////////////////////////////////////////////////////////////////////////////
		//console.log('xXXXXXXXXXXXXXXXXXXXXXXXx')
		// if(this.searchBool){
		// 	this.searchBool=false;
    }

	searchIn(searchText,data){
		console.log(searchText);
		return data.filter((item) => {
			//console.log(item)
            return item.notifyTitle.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
        });
    }

    searchType(type){
		//console.log(type);
		return this.SearchData.filter((item) => {
			//console.log(item.type_name)
            return item.type_name.toLowerCase().indexOf(type.toLowerCase()) > -1;
        });     
    }

    update_status(id,status){
    	return Observable.create((observer)=>{
			this.body = "key=update_status"+
						"&notification_id="+id+
						"&status="+status;
			console.log(this.body);
			this.http.post(this.registerURI,
		    				this.body,
		    				this.requestOpt
		    				).subscribe((data)=>{
		    					this.response=data.json()
		    					console.log(this.response)
		    					observer.next(this.response["message"]);
		    					observer.complete();
		    				})
		});
    }

    update_accept_user(id,accept_user_id){
    	return Observable.create((observer)=>{
			this.body = "key=update_accept_user"+
						"&notification_id="+id+
						"&accept_user_id="+accept_user_id;
			console.log(this.body);
			this.http.post(this.registerURI,
		    				this.body,
		    				this.requestOpt
		    				).subscribe((data)=>{
		    					this.response=data.json()
		    					console.log(this.response)
		    					observer.next(this.response["message"]);
		    					observer.complete();
		    				})
		});
    }

    viewStatus(id){
		return Observable.create((observer)=>{
			this.body = "key=view_status"+
						"&notification_id="+id;
			this.http.post(this.registerURI,
		    				this.body,
		    				this.requestOpt
		    				).subscribe((data)=>{
		    					this.response=data.json()
		    					console.log(this.response)
		    					observer.next(this.response["message"]);
		    					observer.complete();
		    				})
		});
    }

    listGive(start,datalist){
	return Observable.create((observer)=>{
    		this.body = "key=list_give"+
						"&start="+start.toString()+
						"&user="+this.sharedData.username;
    		this.http.post(this.registerURI,
		    				this.body,
		    				this.requestOpt
		    				).subscribe((data)=>{
		    					if(data.status===200){
		    						this.response=data.json()
		    						if(this.response["message"]=="Success"){
		    							console.log("Success list")
		    							this.SearchData = datalist;
		    							this.SearchData = this.response["data"];
		    							observer.next(this.response["data"]);
		    							observer.complete();
		    						}
		    					}
		    				},(err)=>{
		    					console.log(err);
		    				})
    	},(err)=>{
			console.log(err);
    	});
    }

    listRecieve(start,datalist){
    	return Observable.create((observer)=>{
    		this.body = "key=list_recieve"+
    					"&start="+start.toString()+
    					"&user="+this.sharedData.username;
    		this.http.post(this.registerURI,
		    				this.body,
		    				this.requestOpt
		    				).subscribe((data)=>{
		    					if(data.status===200){
		    						this.response=data.json()
		    						if(this.response["message"]=="Success"){
		    							console.log("Success list")
		    							this.SearchData = datalist;
		    							this.SearchData = this.response["data"];
		    							observer.next(this.response["data"]);
		    							observer.complete();
		    						}
		    					}
		    				},(err)=>{
		    					console.log(err);
		    				})
    	},(err)=>{
			console.log(err);
    	});
    }

    myInterestingList(start,datalist){
    	return Observable.create((observer)=>{
    		this.body = "key=my_interesting_list"+
    					"&start="+start.toString()+
    					"&user="+this.sharedData.username+
    					"&user_id="+this.sharedData.id;
    		console.log(this.sharedData.id)
    		this.http.post(this.registerURI,
		    				this.body,
		    				this.requestOpt
		    				).subscribe((data)=>{
		    					console.log(data)
		    					if(data.status===200){
		    						this.response=data.json()
		    						if(this.response["message"]=="Success"){
		    							console.log("Success list")
		    							this.SearchData = datalist;
		    							observer.next(this.response["data"]);
		    							observer.complete();
		    						}
		    					}else if(data.status===0){
		    						console.log("can not connect");
		    					}
		    				},(err)=>{console.log(err);})
		},(err)=>console.log(err))
    }

    myList(start,datalist){
		return Observable.create((observer)=>{
			this.body = "key=my_list"+
						"&start="+start.toString()+
						"&user="+this.sharedData.username;

			this.http.post(this.registerURI,
		    				this.body,
		    				this.requestOpt
		    				).subscribe((data)=>{
		    					console.log(data)
		    					if(data.status===200){
		    						this.response=data.json()
		    						if(this.response["message"]=="Success"){
		    							console.log("Success list")
		    							this.SearchData=datalist;
		    							observer.next(this.response["data"]);
		    							observer.complete();
		    						}
		    					}else if(data.status===0){
		    						console.log("can not connect");
		    					}
		    				},(err)=>{console.log(err);})
		},(err)=>console.log(err))
    }

    someoneList(start,datalist,username){
		return Observable.create((observer)=>{
			this.body = "key=my_list"+
						"&start="+start.toString()+
						"&user="+username;
			this.http.post(this.registerURI,
		    				this.body,
		    				this.requestOpt
		    				).subscribe((data)=>{
		    					console.log(data)
		    					if(data.status===200){
		    						this.response=data.json()
		    						if(this.response["message"]=="Success"){
		    							console.log("Success list")
		    							this.SearchData=datalist;
		    							observer.next(this.response["data"]);
		    							observer.complete();
		    						}
		    					}else if(data.status===0){
		    						console.log("can not connect");
		    					}
		    				},(err)=>{console.log(err);})
		},(err)=>console.log(err))
    }
    
	list(start,datalist){
		return Observable.create((observer)=>{
			this.body = "key=list"+
						"&start="+start.toString()+
						"&user="+this.sharedData.username;
			console.log("this start= "+ start);
			this.http.post(this.registerURI,
		    				this.body,
		    				this.requestOpt
		    				).subscribe((data)=>{
		    					console.log(data)
		    					if(data.status===200){
		    						this.response=data.json()
		    						if(this.response["message"]=="Success"){
		    							console.log("Success list")
		    							this.SearchData=datalist;
		    							observer.next(this.response["data"]);
		    							observer.complete();
		    						}
		    					}else if(data.status===0){
		    						console.log("can not connect");
		    					}
		    				},(err)=>{console.log(err);})
		},(err)=>console.log(err))
	}

	create(title,date,detail,type,image=""){
		if(image===null){
			image='';
		}
		return Observable.create((observer)=>{
			this.body = "key=create"+
		                "&username=" + this.sharedData.username.valueOf() +
		                "&title=" + title +
		                "&detail=" + detail +
		                "&type="+ type+
		                "&image="+image;
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
		    							console.log("fails");
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
