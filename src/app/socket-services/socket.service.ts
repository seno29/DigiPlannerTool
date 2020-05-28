import { Injectable, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { fabric } from 'fabric';

// @Injectable({ providedIn: 'root' })
export class SocketService implements OnInit {
  constructor(public socket: Socket) {}

  ngOnInit() {}

  sendCanvas(canvas: fabric.Canvas, id?: String) {
    this.socket.emit('canvas', [canvas, id]);
  }

  somethingAdded(shape: String, color: String, id?: String) {
    this.socket.emit('addedObject', [shape, color, id]);
  }

  somethingModified(canvas: fabric.Canvas, id?: String) {
    console.log('modified');
    this.socket.emit('modifiedObject', [canvas, id]);
  }

  clearCanvas(canvas: fabric.Canvas, id?: String) {
    this.socket.emit('clearCanvas', [canvas, id]);
  }

  colorChange(data, color: String, id?: String) {
    this.socket.emit('colorChange', [data, color, id]);
  }

  joinRoom(id: String) {
    this.socket.emit('joinRoom', id);
  }

  deleteGroup(data, id?: String) {
    this.socket.emit('deleteGroup', [data, id]);
  }

  regr(canvas: fabric.Canvas, id?: String) {
    this.socket.emit('regrouping', [canvas, id]);
  }

  drawLines(can: any){
    this.socket.emit("drawingLines", can);
  }
}
