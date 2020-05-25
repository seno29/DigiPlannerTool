import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.css']
})
export class CreateBoardDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef:MatDialogRef<CreateBoardDialogComponent>) {

  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
