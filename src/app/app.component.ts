import { Component } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import { UserService } from './user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'digi-planner';
  currentUser:SocialUser;

  constructor(private authService:AuthService,private userService:UserService,private router:Router){

  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user)=>{
      this.currentUser = user;
      if(this.currentUser){
        this.router.navigate(['/home']);
        // if(this.userService.isAdmin(this.currentUser.email)){
        //   this.router.navigate(['/home']);
        // }else if(this.userService.isUser(this.currentUser.email)){
        //   this.router.navigate(['/home']);
        // }
      }else{
        console.log('not logged in');
        this.router.navigate(['/login']);
      }
    }); 
     
  }

  signOut(){
    this.authService.signOut();
  }
}
