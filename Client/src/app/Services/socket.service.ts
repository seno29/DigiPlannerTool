import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class SocketService {
  constructor(public socket: Socket) {}

  sendCanvas(data) {
    this.socket.emit('canvas', data);
  }
}
