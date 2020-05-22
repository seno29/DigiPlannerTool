import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { JoinRoomDialogComponent } from '../join-room-dialog/join-room-dialog.component';
import { CreateBoardDialogComponent } from '../create-board-dialog/create-board-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAdmin:boolean = false;
  isUser:boolean = false;
  inH:number;
  constructor(private route:ActivatedRoute,
      private dialog:MatDialog,
      private snackBar:MatSnackBar,
      private router:Router) {
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
  }

  createBoard(){
    //DBMS interaction
    //roomcode uniqueness
    //add room code to its x-set
    // this.router.navigate(['/adminboard'],{roomcode});
    let dialogRef = this.dialog.open(CreateBoardDialogComponent,{
      data:{boardTitle:null,roomCode:null}
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result.roomCode && result.boardTitle){
        // this.router.navigate(['/userboard'],{queryParams:{room_code:result.roomCode}});
        this.showSnackBar('Board created!','OK');
        console.log(`room code is: ${result.roomCode} and board name:${result.boardTitle}`);
      }else{
        console.log('not valid info');
      }
    });
  }

  joinBoard(){
    //validity of room code and if valid add it to set

    let dialogRef = this.dialog.open(JoinRoomDialogComponent,{
      data:{roomCode:null}
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.router.navigate(['/userboard'],{queryParams:{room_code:result}});
        console.log(`room code is: ${result}`);
      }else{
        this.showSnackBar('Please enter the room code to join','cancel');
      }
    });
  }

  showSnackBar(message:string,action:string){
    this.snackBar.open(message,action,{
      duration:3000
    });
  }

  viewBoard(){
    //display roomcode and corresponding board name for user
    this.router.navigate(['/viewboard']);
  }
}
