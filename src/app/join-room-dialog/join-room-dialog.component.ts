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
    if(roomcode){
      this.boardService.isExist(roomcode).subscribe((result) => {
        console.log(result);
        this.isexist = result;
        this.emptyRoomCode = false;
      });
    }else{
      this.emptyRoomCode=true;
    }
  }
}
