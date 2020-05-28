import { Injectable, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { fabric } from 'fabric';

// @Injectable({ providedIn: 'root' })
export class SocketService implements OnInit {
  constructor(public socket: Socket) {}

  ngOnInit() {}

  sendCanvas(canvas: fabric.Canvas, id?: String) {
    this.socket.emit('canvas', [canvas, id]);
    //http save canvas
  }

  somethingAdded(shape: String, color: String, id?: String) {
    this.socket.emit('addedObject', [shape, color, id]);
    //http save canvas
  }

  somethingModified(canvas: fabric.Canvas, id?: String) {
    console.log('modified');
    this.socket.emit('modifiedObject', [canvas, id]);
    //http save canvas
  }

  clearCanvas(canvas: fabric.Canvas, id?: String) {
    this.socket.emit('clearCanvas', [canvas, id]);
    //http save canvas
  }

  colorChange(data, color: String, id?: String) {
    this.socket.emit('colorChange', [data, color, id]);
    //http save canvas
  }

  joinRoom(id: String) {
    this.socket.emit('joinRoom', id);
    //http save canvas
  }

  deleteGroup(data, id?: String) {
    this.socket.emit('deleteGroup', [data, id]);
    //http save canvas
  }

  regr(canvas: fabric.Canvas, id?: String) {
    this.socket.emit('regrouping', [canvas, id]);
    //http save canvas
  }

  drawLines(can: any) {
    this.socket.emit('drawingLines', can);
    //http save canvas
  }
}
