import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { JoinRoomDialogComponent } from '../join-room-dialog/join-room-dialog.component';
import { CreateBoardDialogComponent } from '../create-board-dialog/create-board-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService,SocialUser } from 'angularx-social-login';
import { BoardService } from '../board.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAdmin:boolean = false;
  isUser:boolean = false;
  inH:number;
  currentUser:SocialUser;
  constructor(private route:ActivatedRoute,
      private dialog:MatDialog,
      private snackBar:MatSnackBar,
      private router:Router,
      private authService:AuthService,
      private boardService:BoardService,
      private userService:UserService) {
    this.inH = window.innerHeight*0.9;
   }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.currentUser = user;
      if(!this.currentUser){
        this.router.navigate(['/login']);
      } else {
        this.userService.getUserType(this.currentUser.email).subscribe((result) => {
          if(result['success']) {
            let data = result['data'];
            let userType = data['roles'][0] === 1 ? 'admin' : 'user';
            this.isAdmin = userType === 'admin' ? true : false;
            this.isUser = userType === 'user' ? true : false;
          }
        });
      }
    });
  }

  createBoard():void {
    let dialogRef = this.dialog.open(CreateBoardDialogComponent,{
      data:{boardTitle:null,roomCode:null,userId:this.currentUser.email}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result && result.roomCode && result.boardTitle) {
        let roomCode:string=result.roomCode;
        let boardTitle:string=result.boardTitle;

        this.boardService.createBoard(roomCode,boardTitle,this.currentUser.email).subscribe((result) => {
          if(result['success'] === true) {
            this.showSnackBar('Board created!','OK');
            this.router.navigate(['/adminboard'],{
              queryParams:{roomCode:roomCode, boardTitle:boardTitle}
            });
          } else {
            this.showSnackBar('cannot create board!','cancel');
          }
        },
        (err) => {
          console.log(err);
        }
        );
      }
    });
  }

  joinBoard():void {
    let dialogRef = this.dialog.open(JoinRoomDialogComponent,{
      data:{roomCode:null,userId:this.currentUser.email}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.boardService.addJoinedRoom(result,this.currentUser.email).subscribe((result) => {
          if(result['success']){
            this.showSnackBar('Now joining room','OK');
            this.router.navigate(['/userboard'],{queryParams:{room_code:result}});
          }else{
            this.showSnackBar('Unable to join room','cancel');
          }
        },
        (err) => {
          console.log(err);
          this.showSnackBar('Unable to join room','cancel');
        }
        );
      } else {
        this.showSnackBar('Please enter the room code to join','cancel');
      }
    });
  }

  showSnackBar(message:string,action:string):void {
    this.snackBar.open(message,action,{
      duration:3000
    });
  }

  viewBoard():void {
    this.router.navigate(['/viewboard']);
  }
}
