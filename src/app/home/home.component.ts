import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { JoinRoomDialogComponent } from '../join-room-dialog/join-room-dialog.component';
import { CreateBoardDialogComponent } from '../create-board-dialog/create-board-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService,SocialUser } from 'angularx-social-login';
import { BoardService } from '../board.service';

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
      private boardService:BoardService) {
    this.inH = window.innerHeight*0.9;
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['userType'] === 'admin'){
        this.isAdmin=true;
      }
      if(params['userType'] === 'user'){
        this.isUser=true;
      }
    });

    this.authService.authState.subscribe((user) => {
      this.currentUser = user;
      if(!this.currentUser){
        this.router.navigate(['/login']);
      }
    });
  }

  createBoard():void {
    let dialogRef = this.dialog.open(CreateBoardDialogComponent,{
      data:{boardTitle:null,roomCode:null}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result && result.roomCode && result.boardTitle) {
        let roomCode:string=result.roomCode;
        let boardTitle:string=result.boardTitle;

        this.boardService.createBoard(roomCode,boardTitle,this.currentUser.email).subscribe((result) => {
          if(result && result === 'OK') {
            this.showSnackBar('Board created!','OK');
            this.router.navigate(['/adminboard'],{
              queryParams:{roomCode:roomCode, boardTitle:boardTitle}
            });
          } else {
            this.showSnackBar('cannot create board!','cancel');
          }
        },
        (err) => {console.log(err);}
        );

        this.showSnackBar('Board created!','OK');
        this.router.navigate(['/adminboard'],{
          queryParams:{roomCode:result.roomCode, boardTitle:result.boardTitle}
        });
      } else {
        console.log('not valid info');
      }
    });
  }

  joinBoard():void {
    let dialogRef = this.dialog.open(JoinRoomDialogComponent,{
      data:{roomCode:null}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.boardService.addJoinedRoom(result,this.currentUser.email).subscribe((value) => {
          console.log(value);
          if(value === '1'){
            this.showSnackBar('Now joining room','OK');
            this.router.navigate(['/userboard'],{queryParams:{room_code:result}});
          }else{
            this.showSnackBar('Unable to join room','cancel');
          }
        },
        (err) => {console.log(err);}
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
