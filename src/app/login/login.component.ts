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
  // isAdmin:boolean;
  // isUser:boolean;
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
      if(this.currentUser && this.userService.isAdmin(this.currentUser.email)){
        this.router.navigate(['/home'],{queryParams: {userType: 'admin'}});
      }else if(this.currentUser && this.userService.isUser(this.currentUser.email)){
        this.router.navigate(['/home'],{queryParams:{userType: 'user'}});
      }
    }); 
  }

  onChange(event){   
    this.userType=event.value;
    console.log(this.userType);
  }

  signIn():void{
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user)=>{
      if(user){
        if(this.isValid(user)){
          this.showSnackBar('Login Successful','cancel');
          this.router.navigate(['/home'],{queryParams: {userType: this.userType}});
          // console.log(`signed in:${user.email} ${this.userType}`);
        }else{
          this.showSnackBar('invalid User Type','Try again!');
          this.signOut();
        }  
      }
    }).catch(error => {
      console.log(error);
      this.showSnackBar('Error in signing in','cancel');
    });
  }

  signOut(){
    this.authService.signOut();
  }

  isValid(user:SocialUser):boolean{
    if((this.userType === 'admin' && this.userService.isAdmin(user.email)) 
    || (this.userType === 'user' && this.userService.isUser(user.email))){
      return true;
    }
    return false;
  }

  showSnackBar(message:string,action:string){
    this.snackBar.open(message,action,{
      duration:3000,
    });
  }

}
