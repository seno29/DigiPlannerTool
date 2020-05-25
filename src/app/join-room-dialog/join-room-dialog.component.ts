import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-join-room-dialog',
  templateUrl: './join-room-dialog.component.html',
  styleUrls: ['./join-room-dialog.component.css']
})
export class JoinRoomDialogComponent implements OnInit {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef:MatDialogRef<JoinRoomDialogComponent>) {

  }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
