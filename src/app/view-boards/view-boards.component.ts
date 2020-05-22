import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-boards',
  templateUrl: './view-boards.component.html',
  styleUrls: ['./view-boards.component.css']
})
export class ViewBoardsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  viewBoard(roomCode:string):void{
    this.router.navigate(['/userboard'],{queryParams:{roomCode:roomCode}});
  }
}
