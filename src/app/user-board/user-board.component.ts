import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css']
})
export class UserBoardComponent implements OnInit {

  colors = ['red', 'blue', 'green', 'yellow', 'orange'];
  selectedColor: string;
  connectPressed: boolean;

  constructor() {
    this.selectedColor = 'red';
    this.connectPressed = false;
  }

  ngOnInit(): void {
  }

}
