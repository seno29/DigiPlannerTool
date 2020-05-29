import { Injectable, Renderer2 } from '@angular/core';
import { fabric } from 'fabric';
import { ScalingService } from './scaling.service';
import { ConstantsService } from './constants.service';
import { SocketService } from '../socket-services/socket.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  selectedGroup: fabric.Group;
  givingId;
  constructor( private scalingService: ScalingService, private constants: ConstantsService, private socketService: SocketService){
    this.givingId = 0;
  }

  makeLine(coords: fabric.Point) {
    return new fabric.Line(coords, {
      stroke: 'black',
      strokeWidth: 2,
      opacity: 0.6,
      selectable: false,
      preserveObjectStacking: true,
    });
  }

  createGroup( shape: fabric.Object, text: fabric.Itext, canvas: fabric.Canvas, x: number, y: number,
               connections: Array<{ name: string; line: fabric.Line; connectedWith: fabric.Group; i: any; }>, renderer: Renderer2) {
    this.scalingService.scaleShapes(shape, text.getBoundingRect());
    const group = new fabric.Group([shape, text], {
      left: x,
      top: y,
      connections,
      isEditable: true,
    });
    group.id = this.givingId;
    text.id = this.givingId;
    group.type = 'group';
    this.givingId += 1;
    group.setControlsVisibility(this.constants.HideControls);
    this.addEventListeners(canvas, group, renderer);
    canvas.add(group);
    canvas.setActiveObject(group);
  }

  doubleClickEvent(obj, handler) {
    return () => {
      if (obj.clicked) {
        handler(obj);
      } else {
        obj.clicked = true;
        setTimeout(() => {
          obj.clicked = false;
        }, 500);
      }
    };
  }

  unGroup(group: fabric.Group, canvas: fabric.Canvas) {
    this.selectedGroup = group;
    const items = group._objects;
    group._restoreObjectsState();
    canvas.remove(group);
    for (const item of items) {
      canvas.add(item);
    }
    canvas.renderAll();
  }

  regroup( shape: fabric.Object, text: fabric.IText,
           canvas: fabric.Canvas, renderer: Renderer2){
    canvas.remove(shape);
    canvas.remove(text);
    const groupCoord = this.selectedGroup.getPointByOrigin(0, 0);
    this.createGroup(
      shape,
      text,
      canvas,
      groupCoord.x,
      groupCoord.y,
      this.selectedGroup.connections,
      renderer
    );
  }

  drawLineTwoPoints(canvas: fabric.Canvas) {
    const group1 = canvas.selectedElements[0];
    const group2 = canvas.selectedElements[1];
    const line = this.makeLine([
      group1.getCenterPoint().x,
      group1.getCenterPoint().y,
      group2.getCenterPoint().x,
      group2.getCenterPoint().y,
    ]);
    canvas.add(line);
    canvas.sendToBack(line);
    group1.connections.push({ name: 'p1', line, connectedGroup: group2 });
    group2.connections.push({ name: 'p2', line, connectedGroup: group1 });
    canvas.connect = false;
    canvas.connectButtonText = this.constants.connectText;
  }

  moveLines(group: fabric.Group) {
    const newPoint = group.getCenterPoint();
    for (const connection of group.connections) {
      if (connection.name === 'p1') {
        connection.line.set({
          x1: newPoint.x,
          y1: newPoint.y,
        });
      } else {
        connection.line.set({
          x2: newPoint.x,
          y2: newPoint.y,
        });
      }
    }
  }

  delete(canvas: fabric.Canvas, gr?: fabric.Group) {
    let group;
    if (gr) {
      group = gr;
    } else {
      group = canvas.getActiveObject();
      this.socketService.deleteGroup(group.id, this.constants.roomID);
      console.log('Delete');
    }
    for (const connection of group.connections) {
      // tslint:disable-next-line: forin
      for (const index in connection.connectedGroup.connections) {
        const otherGroupConnections = connection.connectedGroup.connections;
        if (otherGroupConnections[index].connectedGroup === group) {
          otherGroupConnections.splice(index, 1);
        }
      }
      canvas.remove(connection.line);
    }
    canvas.remove(group);
    canvas.renderAll();
  }

  addDeleteBtn( x: number, y: number, canvas: fabric.Canvas, renderer: Renderer2){
    document.getElementById('deleteBtn')?.remove();
    const btnLeft = x - 10;
    const btnTop = y - 10;
    const delteBtn = renderer.createElement('img');
    delteBtn.id = 'deleteBtn';
    delteBtn.src = '../assets/icons8-delete.svg';
    delteBtn.style = `position:absolute;
    top:${btnTop}px;
    left:${btnLeft}px;
    cursor:pointer;
    width:20px;
    height:20px;`;
    renderer.appendChild( document.getElementsByClassName('canvas-container')[0], delteBtn);
    document.getElementById('deleteBtn').addEventListener('click', (event) => {
      this.delete(canvas);
    });
  }

  addEventListeners( canvas: fabric.Canvas, group: fabric.Group, renderer: Renderer2) {
    group.on('selected', (e) => {
      this.addDeleteBtn(
        group.oCoords.tr.x,
        group.oCoords.tr.y,
        canvas,
        renderer
      );
    });

    group.on('modified', (e) => {
      this.addDeleteBtn(
        group.oCoords.tr.x,
        group.oCoords.tr.y,
        canvas,
        renderer
      );
    });

    group.on('scaling', (e) => {
      document.getElementById('deleteBtn')?.remove();
      this.socketService.sendGroup(group, this.constants.roomID);
    });

    group.on('moving', (e) => {
      document.getElementById('deleteBtn')?.remove();
      if (group.connections.length > 0) {
        this.moveLines(group);
        canvas.renderAll();
      }
      this.socketService.sendGroup(group, this.constants.roomID);
    });

    group.on('rotating', (e) => {
      document.getElementById('deleteBtn')?.remove();
      this.socketService.sendGroup(group, this.constants.roomID);
    });

    group.on('removed', (e) => {
      document.getElementById('deleteBtn')?.remove();
    });

    group.on(
      'mousedown',
      this.doubleClickEvent(group, () => {
        if (canvas.connect) {
          canvas.selectedElements.push(group);
          if (canvas.selectedElements.length === 2) {
            this.drawLineTwoPoints(canvas);
            this.socketService.drawLines({
              f: canvas.selectedElements[0].id,
              s: canvas.selectedElements[1].id,
              roomId: this.constants.roomID,
            });
            canvas.selectedElements.pop();
            canvas.selectedElements.pop();
          }
        } else {
          group.isEditable = false;
          this.socketService.somethingModified(group.id, this.constants.roomID);
          this.unGroup(group, canvas);
          const text1 = group._objects[1];
          text1.lockMovementX = false;
          text1.lockMovementY = false;
          canvas.setActiveObject(text1);
          text1.enterEditing();
          text1.selectAll();
        }
      })
    );

    canvas.on('mouse:down', (e) => {
      if (!canvas.getActiveObject()) {
        document.getElementById('deleteBtn')?.remove();
      }
    });
  }
}
