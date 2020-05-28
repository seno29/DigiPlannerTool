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
    this.socket.emit("modifiedObject", can);
  }

  regr(can: any){
    this.socket.emit("regrouping", can);
  }

  drawLines(can: any){
    this.socket.emit("drawingLines", can);
  }
}
