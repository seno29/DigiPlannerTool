import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  adminList:string[] = ['dikshagupta2012@gmail.com','svj456@gmail.com'];
  userList:string[] = ['harshita234@gmail.com','johnDoe@gmail.com'];
  constructor() { }

  isAdmin(email:string):boolean { 
    return !!this.adminList.find(adminId=>adminId === email);
  }
  isUser(email:string):boolean { 
    return !!this.userList.find(userId=>userId === email);
  }
}
