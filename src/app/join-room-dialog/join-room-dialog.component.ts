import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-join-room-dialog',
  templateUrl: './join-room-dialog.component.html',
  styleUrls: ['./join-room-dialog.component.css']
})
export class JoinRoomDialogComponent implements OnInit {
  isexist:boolean = true;
  emptyRoomCode:boolean = true;
  message:string='';
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef:MatDialogRef<JoinRoomDialogComponent>,
    private boardService:BoardService) {

  }

  ngOnInit(): void { 
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  validateRoomCode(roomcode:string){
    if(roomcode && roomcode.length>=4){
      this.boardService.isExist(this.data.userId,roomcode).subscribe((result) => {
        console.log(result);
        if(result['success']){
          if(result['messages'][0] === 'Room Id exists and is accessible'){
            this.isexist = true;
          }else{
            this.isexist = false;
            this.message = result['messages'][0];
          }
        }else{
          this.isexist = false;
          this.message = result['messages'][0];
        }
        this.emptyRoomCode = false;
      },
      (err) => {
        console.log(err);
        this.isexist = false;
        this.message = 'room code does not exist';
      }  
      );
    }else{
      this.isexist = true;
      this.emptyRoomCode=true;
    }
  }
}
