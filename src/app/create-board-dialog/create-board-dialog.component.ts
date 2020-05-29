import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.css']
})
export class CreateBoardDialogComponent implements OnInit {
  isexist:boolean = false;
  emptyRoomCode:boolean=true;
  emptyBoardtitle:boolean=true;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef:MatDialogRef<CreateBoardDialogComponent>,
    private boardService:BoardService) {

  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  validateTitle(boardtitle:string){
    this.emptyBoardtitle = boardtitle ? false : true;
  }
  validateRoomCode(roomcode:string){
    if(roomcode && roomcode.length>=4){
      this.boardService.isExist(roomcode).subscribe((result) => {
        this.isexist = result;
        this.emptyRoomCode = false;
      });
    }else{
      this.emptyRoomCode=true;
    }
  }
}
