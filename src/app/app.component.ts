import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import { UserService } from './user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title:string = 'digi-planner';
  currentUser:SocialUser;
  userType:string;
  constructor(private authService:AuthService,private userService:UserService,private router:Router){

  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.currentUser = user;
    });  
  }

  signOut(){
    this.authService.signOut();
  }

  goToHome(){
    if(this.currentUser){
        this.router.navigate(['/home']);      
    }else{
      console.log('not logged in');
      this.router.navigate(['/login']);
    }
  }  
}
