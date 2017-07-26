import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import { FormControl } from '@angular/forms';
/*
  Generated class for the SharedDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SharedData {
   _state = {};
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
  lang:string='TH';
  constructor() {
      this.username = '';
      this.name = '';
      this.surname = '';
      this.tel = 0;
      this.email = '';
  }

    text:any={"TH":{
                  "send":"ส่ง",
                  "give_interesting":"สนใจจะให้",
                  "recieve_interesting":"สนใจจะรับ",
                  "not_interesting":"เลิกสนใจ",
                  "tab_home":"หน้าแรก",
                  "tab_give":"ให้",
                  "tab_recieve":"รับ",
                  "home":"หน้าแรก",
                  "profile":"ข้อมูลส่วนตัว",
                  "notifyManager":"ตัวจัดการประกาศ",
                  "wantTo":"ประกาศที่ต้องการให้/รับ",
                  "createNotify":"สร้างประกาศ",
                  "rule":"กฏการประกาศ",
                  "logout":"ออกจากระบบ",
                  "setting":"ตั้งค่า",
                  "give_title":"ประกาศการให้",
                  "recieve_title":"ประกาศการรับ",
                  "setting_title":"การตั้งค่า",
                  "setting_theme":"เลือกธีม",
                  "setting_lang":"เลือกภาษา",
                  "home_title":"ประกาศ",
                  "status": "สถานะ",
                  "type": "ประเภท",
                  "wait":"รอการตัดสินใจ",
                  "give_finish":"มอบสิ่งของแล้ว",
                  "recieve_finish":"ได้รับสิ่งของแล้ว",
                  "non_finish":"ยังไม่เสร็จสิ้น",
                  "giving":"การให้",
                  "recieving":"การรับ",
                  "comment_title":"แสดงความคิดเห็น",
                  "edit":"แก้ไขข้อมูล",
                  "history":"ดูประวีติการประกาศ",
                  "view_comment":"ดูความคิดเห็น",
                  "save":"บันทึกข้อมูล",
                  "cancel":"ยกเลิก",
                  "interesting_number":"จำนวนผู้ที่สนใจ",
                  "give_number":"จำนวนผู้ที่สนใจจะให้",
                  "recieve_number":"จำนวนผู้ที่สนใจจะรับ",
                  "detail":"รายละเอียด",
                   "reason":"เหตุผล"
                },
            "ENG":{
                  "send":"send",
                  "give_interesting":"Giving interesting",
                  "recieve_interesting":"Recieve interesting",
                  "not_interesting":"not interesting",
                  "tab_home":"home",
                  "tab_give":"give",
                  "tab_recieve":"recieve",
                  "home":"Home",
                  "profile":"Profile",
                  "notifyManager":"Notify Manager",
                  "wantTo":"Your Interesting",
                  "createNotify":"Create notify",
                  "rule":"Rule",
                  "setting":"Setting",
                  "logout":"Logout",
                  "give_title":"Giving Notify",
                  "recieve_title":"Recieving Notify",
                   "setting_title":"Setting",
                   "setting_theme":"Select theme",
                   "setting_lang":"Select language",
                   "home_title":"Notify",
                   "status":"Status",
                   "type":"Type",
                   "wait":"Wait",
                   "give_finish":"Finish",
                   "recieve_finish":"Finish",
                   "non_finish":"Don't finish",
                   "giving":"Giving",
                   "recieving":"Recieving",
                   "comment_title":"Coment",
                   "edit":"Edit Data",
                   "history":"Notify history",
                   "view_comment":"View comment",
                   "save":"Save",
                   "cancel":"Cancel",
                   "interesting_number":"Interesting number",
                   "give_number":"Interesting number",
                   "recieve_number":"Interesting number",
                   "detail":"Detail",
                   "reason":"Reason"
                }
          }

  get state() {
    return this._state = this._clone(this._state);
  }
   
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }
  get(prop?: any) {
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }
  set(prop: string, value: any) {
    return this._state[prop] = value;
  }
  _clone(object) {
    return JSON.parse(JSON.stringify(object));
  }

  setLang(lang){
    this.lang=lang;
    if((this.lang!='TH') && (this.lang != "ENG")){
      this.lang='TH';
    }
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