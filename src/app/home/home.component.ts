import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAdmin:boolean = false;
  isUser:boolean = false;
  inH:number;
  constructor(private route:ActivatedRoute) {
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
    console.log(this.isAdmin);
    console.log(this.isUser);
  }

  createBoard(){

  }

  joinBoard(){

  }

}
