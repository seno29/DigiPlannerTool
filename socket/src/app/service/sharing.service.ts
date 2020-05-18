import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  constructor(private socket: Socket) { }

  sendMessage(msg: string){
    this.socket.emit("message", msg);
  }

}
