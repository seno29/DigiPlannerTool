import { Injectable, APP_INITIALIZER } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class AdminSocketService {
  constructor(private socket: Socket) {}

  init(canvas, roomId) {
    this.socket.emit('joinRoom', roomId);

    canvas.on('object:moving', (options) => {
      console.log('Moving');
      this.sendCanvas(canvas, roomId);
    });

    canvas.on('object:scaling', (options) => {
      console.log('Scaling');
      this.sendCanvas(canvas, roomId);
    });

    canvas.on('object:rotating', (options) => {
      console.log('Rotating');
      this.sendCanvas(canvas, roomId);
    });

    canvas.on('object:modified', (options) => {
      console.log('Obj Modified');
      this.sendCanvas(canvas, roomId);
    });

    //For Pen Mode
    canvas.on('mouse:up', (options) => {
      console.log('Mouse Up');
      this.sendCanvas(canvas, roomId);
    });

    canvas.on('object:removed', (options) => {
      console.log('Obj Removed');
      this.sendCanvas(canvas, roomId);
    });

    this.socket.on('addedObject', (data) => {
      console.log('obj added');
      canvas.loadFromJSON(data[0], canvas.renderAll.bind(canvas));
    });

    this.socket.on('canvas', (data) => {
      canvas.loadFromJSON(data[0], canvas.renderAll.bind(canvas));
    });
  }

  sendCanvas(canvas, roomId) {
    this.socket.emit('canvas', [canvas, roomId]);
  }
}