import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { GroupService } from '../user-board-services/group.service';
import { ShapeService } from '../user-board-services/shape.service';
import { fabric } from 'fabric';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class UserSocketService {
  roomId;
  constructor(
    private socket: Socket,
    private groupService: GroupService,
    private shapeService: ShapeService,
    private socketService: SocketService
  ) { }
  init(canvas, renderer, roomId) {
    this.roomId = roomId;
    this.socketService.joinRoom(this.roomId);

    canvas.on('object:moving', (options) => {
      console.log('moving');
      this.socketService.sendCanvas(this.getAll(canvas), roomId);
    });

    canvas.on('object:scaling', (options) => {
      this.socketService.sendCanvas(this.getAll(canvas), roomId);
    });

    canvas.on('object:rotating', (options) => {
      this.socketService.sendCanvas(this.getAll(canvas), roomId);
    });

    this.socket.on('canvas', (h: object) => {
      console.log('Canvas Received');
      document.getElementById('deleteBtn')?.remove();
      canvas.loadFromJSON(h, canvas.renderAll.bind(canvas));
      let gp = new Map();
      gp.clear();
      let p = canvas.getObjects();
      for (const obj of p) {
        if (obj.type === 'group') {
          this.groupService.addEventListeners(
            canvas,
            obj,
            obj._objects[1],
            renderer
          );
          gp.set(obj.id, obj);
        } else {
          canvas.remove(obj);
        }
      }

      let f = canvas.getObjects();
      for (const obj1 of f) {
        if (obj1.type === 'group') {
          canvas.selectedElements.push(gp.get(obj1.id));
          let dummy = JSON.parse(JSON.stringify(obj1.connections));
          let len = obj1.connections.length;
          obj1.connections.splice(0, len);
          for (let l = 0; l < len; l++) {
            if (dummy[l].name === 'p1') {
              let r = gp.get(dummy[l].i);
              canvas.selectedElements.push(r);
              let y = r.connections.length;
              for (let w = 0; w < y; w++) {
                if (r.connections[w].i === obj1.id) {
                  r.connections.splice(w, 1);
                  w++;
                }
              }
              this.groupService.drawLineTwoPoints(canvas);
              canvas.selectedElements.pop();
            }
          }
          canvas.selectedElements.pop();
        }
      }
      canvas.renderAll();
    });

    this.socket.on('addedObject', (data) => {
      console.log('obj added');
      console.log(data);
      if (data[0] === 'rect') {
        this.shapeService.addRectangle(canvas, renderer, data[1]);
      } else if (data[0] === 'ellipse') {
        this.shapeService.addEllipse(canvas, renderer, data[1]);
      } else {
        // this.shapeService.addImage(this.canvas, '', this.renderer);
      }
    });

    this.socket.on('modifiedObject', (h) => {
      document.getElementById('deleteBtn')?.remove();

      console.log('obj modified');
      var gr;
      for (const ob of canvas._objects) {
        if (ob.id === h) {
          gr = ob;
          break;
        }
      }
      var text = gr._objects[1];
      this.groupService.unGroup(gr, canvas);
      canvas.setActiveObject(text);
      text.lockMovementX = false;
      text.lockMovementY = false;
      // text.enterEditing();
      text.selectAll();
    });

    this.socket.on('regrouping', (h: any) => {
      document.getElementById('deleteBtn')?.remove();

      var dummy = new fabric.Canvas();
      dummy.loadFromJSON(h, dummy.renderAll.bind(dummy));
      console.log('Regrouped');
      var gr = this.groupService.selectedGroup;
      var shape = gr._objects[0];
      canvas.remove(gr._objects[1]);
      var text;
      let i = 0;
      for (const obj of dummy._objects) {
        if (obj.id === gr.id) {
          text = obj;
          break;
        }
        i++;
      }
      this.groupService.regroup(shape, text, canvas, renderer);
      console.log(canvas);
    });

    canvas.on('text:editing:exited', (options) => {
      console.log('hELLO tEXT');
      let gr = this.groupService.selectedGroup;
      this.socketService.regr(canvas.toJSON(['id']));
      this.groupService.regroup(
        gr._objects[0],
        gr._objects[1],
        canvas,
        renderer
      );
    });

    this.socket.on('clearCanvas', (can) => {
      canvas.clear();
      document.getElementById('deleteBtn')?.remove();
    });

    this.socket.on('colorChange', (data) => {
      // canvas.selectedColor = data.color;
      var gr;
      for (const ob of canvas._objects) {
        if (ob.id === data[0]) {
          gr = ob;
          break;
        }
      }
      let text = gr._objects[1];
      let shape = gr._objects[0];
      shape.fill = data[1];
      this.groupService.unGroup(gr, canvas);
      this.groupService.regroup(shape, text, canvas, renderer);
    });

    this.socket.on('deleteGroup', (data) => {
      var gr;
      for (const ob of canvas._objects) {
        if (ob.id === data) {
          gr = ob;
          break;
        }
      }
      this.groupService.delete(canvas, gr);
    });

    this.socket.on('drawingLines', (data: any) => {
      // console.log(h.f);
      // console.log(h.s);
      let h = {
        f: data[0],
        s: data[1],
      };
      for (const obj of canvas._objects) {
        if (h.f === obj.id || h.s === obj.id) {
          canvas.selectedElements.push(obj);
        }
      }
      this.groupService.drawLineTwoPoints(canvas);
      canvas.selectedElements.splice(0, 2);
      console.log(canvas);
      console.log('drawing');
    });
  }
  getAll(canvas) {
    var the = canvas.toJSON([
      'connections',
      'isEditable',
      'isMoving',
      '__corner',
      '__controlsVisibility',
      'aCoords',
      'includeDefaultValues',
      'matrixCache',
      'selectable',
      'cacheTranslationX',
      'cacheTranslationY',
      'fromPaste',
      'hasControls',
      'hiddenTextarea',
      'hoverCursor',
      'isEditing',
      'lockMovementX',
      'lockMovementY',
      'selected',
      'selectionEnd',
      'selectionStart',
      '_textBeforeEdit',
      '_cacheContext',
      '_cacheProperties',
      '_clickHandlerInitialized',
      '_currentCursorOpacity',
      '_currentTickCompleteState',
      '_cursorTimeout1',
      '_cursorTimeout2',
      '_forceClearCache',
      '_savedProps',
      'id',
    ]);
    return the;
  }
}
