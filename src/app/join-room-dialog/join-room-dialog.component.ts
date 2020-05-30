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
      this.boardService.isExist(roomcode).subscribe((result) => {
        console.log(result);
        if(result.toString() === 'true'){
          this.isexist = true;
        }else if(result.toString() === 'false'){
          this.isexist = false;
          this.message = 'room does not exist';
        }else{
          this.isexist = false;
          this.message = 'you cannot join this room yet';
        }
        this.emptyRoomCode = false;
      },
      (err) => {
        this.isexist = false;
        this.message = 'you cannot join this room yet';
      }  
      );
    }else{
      this.isexist = true;
      this.emptyRoomCode=true;
    }
  }
}
