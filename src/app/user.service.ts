import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  adminList:string[] = ['svj456@gmail.com'];
  userList:string[] = ['dikshagupta2012@gmail.com','harshita234@gmail.com','johnDoe@gmail.com'];
  constructor() { }

  isAdmin(email:string):boolean { 
    return !!this.adminList.find(adminId=>adminId === email);
  }
  isUser(email:string):boolean { 
    return !!this.userList.find(userId=>userId === email);
  }
}
