import { Injectable, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { fabric } from 'fabric';

@Injectable({ providedIn: 'root' })
export class SocketService {
  constructor(public socket: Socket) { }

  sendGroup(group: fabric.Group, id: string) {
    this.socket.emit('groupAltered',
      [{
        id: group.id,
        left: group.left,
        top: group.top,
        angle: group.angle,
        scaleX: group.scaleX,
        scaleY: group.scaleY
      },
        id]);
  }

  somethingAdded(shape: string, color: string, id: string) {
    this.socket.emit('addedObject', [shape, color, id]);
    //http save canvas
  }

  somethingModified(groupId: any,currentUser,id: string,) {
    console.log('modified');
    this.socket.emit('modifiedObject', [groupId,currentUser, id]);
    //http save canvas
  }

  clearCanvas(canvas: fabric.Canvas, id: string) {
    this.socket.emit('clearCanvas', [canvas, id]);
    //http save canvas
  }

  colorChange(data, color: string, id: string) {
    this.socket.emit('colorChange', [data, color, id]);
    //http save canvas
  }

  joinRoom(id: string) {
    this.socket.emit('joinRoom', id);
    //http save canvas
  }

  deleteGroup(data, id: string) {
    this.socket.emit('deleteGroup', [data, id]);
    //http save canvas
  }

  regr(text: any, textId: any, id: string) {
    this.socket.emit('regrouping', [text, textId, id]);
    //http save canvas
  }

  drawLines(can: any) {
    const arr = [can.f, can.s, can.roomId];
    this.socket.emit('drawingLines', arr);
    //http save canvas
  }
}

