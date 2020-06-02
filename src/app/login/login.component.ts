import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser:SocialUser;
  userType:string="admin";
  inH:number;
  isLoggedIn:boolean = true;
  constructor(
    private authService:AuthService,
    private userService:UserService,
    private snackBar:MatSnackBar,
    private router:Router){
      this.inH = window.innerHeight*0.9;
  }

  ngOnInit():void {
    this.authService.authState.subscribe((user)=>{
      this.currentUser = user;
      if(this.currentUser){
        this.router.navigate(['/home']);
      }else{
        this.isLoggedIn = false;
      }
    }); 
  }

  onChange(event):void {   
    this.userType=event.value;
  }

  signIn():void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      if(user){
        this.userService.getUserType(user.email).subscribe((result) => {
          console.log(result['success']);
          if(result['success']){
            let data = result['data'];
            console.log(data);
            if((data['roles'][0] === 1 && this.userType === 'admin') || (data['roles'][0] === 2 && this.userType === 'user')) {
                this.showSnackBar('Login Successful','cancel');
                this.router.navigate(['/home']);
            } else {
                this.signOut();
                this.showSnackBar('invalid user or usertype!','cancel');
            } 
          }else{
            this.signOut();
            this.showSnackBar(result['messages'],'cancel');
          }
        }); 
      }
    }).catch(error => {
      console.log(error);
      this.showSnackBar('Error in signing in','cancel');
    });
  }

  signOut():void {
    this.authService.signOut();
  }

  showSnackBar(message:string,action:string):void {
    this.snackBar.open(message,action,{
      duration:3000,
    });
  }

}
