import { Injectable, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { fabric } from 'fabric';
import { UserDatabaseService } from '../user-board-services/user-database.service';

@Injectable({ providedIn: 'root' })
export class SocketService {
  constructor(public socket: Socket, private userDatabase: UserDatabaseService) { }

  sendGroup(group: fabric.Group, id: string, canvas: fabric.Canvas) {
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

    this.userDatabase.sendingCanvas(canvas.toJSON(['id', 'connections', 'givingId']));
  }

  somethingAdded(shape: string, color: string, id: string, canvas: fabric.Canvas) {
    this.socket.emit('addedObject', [shape, color, id]);
  }

  somethingModified(groupId: any, currentUser, id: string, canvas: fabric.Canvas) {
    console.log('modified');
    this.socket.emit('modifiedObject', [groupId, currentUser, id]);
  }

  clearCanvas(canvas: fabric.Canvas, id: string) {
    this.socket.emit('clearCanvas', [canvas, id]);
  }

  colorChange(data, color: string, id: string, canvas: fabric.Canvas) {
    this.socket.emit('colorChange', [data, color, id]);
  }

  joinRoom(id: string) {
    this.socket.emit('joinRoom', id);
  }

  deleteGroup(data, id: string, canvas: fabric.Canvas) {
    this.socket.emit('deleteGroup', [data, id]);
  }

  regr(text: any, textId: any, id: string, canvas: fabric.Canvas) {
    this.socket.emit('regrouping', [text, textId, id]);
  }

  drawLines(can: any, canvas: fabric.Canvas) {
    const arr = [can.f, can.s, can.roomId];
    this.socket.emit('drawingLines', arr);
  }
}

