import { Injectable, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnInit {

  constructor(public socket: Socket) { }

  ngOnInit(){

  }

  sendCanvas(can: any){
    this.socket.emit("canvasComing", can);
  }

  somethingAdded(can: any){
    this.socket.emit("addedObject", can);
  }

  somethingModified(can: any){
    console.log("li");
    this.socket.emit("modifiedObject", can);
  }
}
