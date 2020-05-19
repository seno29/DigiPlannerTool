import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  adminList:string[] = ['dikshagupta2012@gmail.com','svj456@gmail.com'];
  userList:string[] = ['harshita234@gmail.com','johnDoe@gmail.com'];
  constructor() { }

  getUserList(){
    return this.userList;
  }

  getAdminList(){
    return this.adminList;
  }

  isAdmin(email:string):boolean { 
    if(this.adminList.find(adminId=>adminId === email)){
      return true;
    }else{
      return false;
    }
  }
  isUser(email:string):boolean { 
    if(this.userList.find(userId=>userId === email)){
      return true;
    }else{
      return false;
    }
  }
}
