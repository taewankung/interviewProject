import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormControl } from '@angular/forms';
/*
  Generated class for the SharedDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SharedData {  
  ip_local:string = '192.168.1.11';
  id:string;
  username: string;
  name: string;
  surname:string;
  tel: number;
  email: string;
  avatar:string;
  province_id:string;
  amphur_id:string;

  image:string= 'http://'+this.ip_local +'/giveAndShare/uploads/';
  amphur_name:string;
  province_name:string;
  friendList:Array<any>;
  groupList:JSON;

  currentPage:any;

  searchUser:JSON;
 	registerCredentials = { 
                          uid:'',
                          username:'',
                          password:'',
                          validatePass:'',
                          name: '',
                          surname:'',
                          tel: '',
                          email:'',
                          avatar:'',
                          province_id:0,
                          amphur_id:0
                        };
  loginCredentials = { 
                          username:'',
                          password: '',
                        };
  constructor() {
      this.username = '';
      this.name = '';
      this.surname = '';
      this.tel = 0;
      this.email = '';
  }
  clearRegisterData(){
  	this.registerCredentials = { 
                          uid:'',
                          username:'',
                          password:'',
                          validatePass:'',
                          name: '',
                          surname:'',
                          tel: '',
                          email: '',
                          avatar:'',
                          province_id:0,
                          amphur_id:0
                      };
      return this.registerCredentials;
  }
  setGroupList(groupList){
      this.groupList=groupList;
  }
  setFriendList(friendList){
      this.friendList = friendList;
  }

  setSearchUser(searchUser) {
      this.searchUser=searchUser;
  }

  setUserName(username, name,email,tel) {
      this.username = username;
      this.name = name;
      this.tel = tel;
      this.email = email;
  }

  getUserName() {
      return this.username + ' ' + this.name;
  }   
}