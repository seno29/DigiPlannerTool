import { Component, OnInit } from '@angular/core';
import { SharingService } from '../service/sharing.service';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  private Username: string;
  private RoomId: string;
  constructor(private ser: SharingService) {
    this.Username = "dummy";
    this.RoomId = "db";
   }

  ngOnInit(): void {
  }

  getInput(e: Event){
    console.log(e);
  }

  setUsername(name: Event){
    this.Username = (<HTMLInputElement>name.target).value;
    console.log(this.Username);
    this.ser.sendMessage(this.Username);
  }

  createRoom(roomid: Event){
    this.RoomId = (<HTMLInputElement>roomid.target).value;
    console.log(this.RoomId);
    this.ser.sendMessage(this.RoomId);
  }

}
