import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  private Username: string;
  private RoomId: string;
  constructor() {
    this.Username = "dummy";
    this.RoomId = "db";
   }

  ngOnInit(): void {
  }

  setUsername(name: Event){
    this.Username = (<HTMLInputElement>name.target).value;
    console.log(this.Username);
  }

  createRoom(roomid: Event){
    this.RoomId = (<HTMLInputElement>roomid.target).value;
    console.log(this.RoomId);
  }
}
