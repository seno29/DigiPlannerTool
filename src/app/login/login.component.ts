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
 
  constructor(
    private authService:AuthService,
    private userService:UserService,
    private snackBar:MatSnackBar,
    private router:Router){
      this.inH = window.innerHeight*0.9;
  }

  ngOnInit(): void {
    console.log(this.userType);
    this.authService.authState.subscribe((user)=>{
      this.currentUser = user;
      if(this.currentUser){
        this.userService.getUserType(this.currentUser.email).subscribe((result)=>{
          if(result != undefined){
            this.userType = result.toString() === '1' ? 'admin' : 'user';
            this.router.navigate(['/home'],{queryParams: {userType: this.userType}});
          }
        },
        (err)=>{console.log('cannot get data from database');}
        );
      }
    }); 
  }

  onChange(event):void{   
    this.userType=event.value;
    console.log(this.userType);
  }

  signIn():void{
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      if(user){
        this.userService.getUserType(user.email).subscribe((result) => {
          if(result != undefined){
            if(result.toString() === '1' && this.userType === 'admin' ) {
              this.showSnackBar('Login Successful','cancel');
              this.router.navigate(['/home'],{queryParams: {userType: 'admin'}});
            } else if(result.toString()==='0' && this.userType === 'user' ) {
              this.showSnackBar('Login Successful','cancel');
              this.router.navigate(['/home'],{queryParams: {userType: 'user'}});
            } else {
                this.showSnackBar(result.toString(),'cancel');
                this.signOut();
            } 
          }
        },
        (err)=>{console.log('cannot get data from database');}
        ); 
      }
    }).catch(error => {
      console.log(error);
      this.showSnackBar('Error in signing in','cancel');
    });
  }

  signOut():void{
    this.authService.signOut();
  }


  showSnackBar(message:string,action:string):void{
    this.snackBar.open(message,action,{
      duration:3000,
    });
  }

}
