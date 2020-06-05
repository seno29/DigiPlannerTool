import { Injectable, Renderer2 } from '@angular/core';
import { fabric } from 'fabric';
import { ScalingService } from './scaling.service';
import { ConstantsService } from './constants.service';
import { SocketService } from '../socket-services/socket.service';
import { UserDatabaseService } from './user-database.service';


@Injectable({
  providedIn: 'root',
})
export class GroupService {
  selectedGroup: Array<fabric.Group> = [];
  givingId;
  currentUser;
  constructor(private scalingService: ScalingService, private constants: ConstantsService,
              private socketService: SocketService, private userDatabase: UserDatabaseService) {
    this.givingId = 0;
    this.currentUser = 'Unknown';
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

  createGroup(shape: fabric.Object, text: fabric.Itext, canvas: fabric.Canvas, x: number, y: number,
              connections: Array<{ name: string; line: fabric.Line; connectedWith: fabric.Group; i: any; }>,
              renderer: Renderer2, groupID: number, editing: boolean,
              angle: number, scaleX: number, scaleY: number): fabric.Group {
    this.scalingService.scaleShapes(shape, text.getBoundingRect());
    const group = new fabric.Group([shape, text], {
      angle,
      scaleX,
      scaleY,
      left: x,
      top: y,
      connections,
      isEditable: true,
    });
    if (groupID === -1) {
      group.id = this.givingId;
      text.id = this.givingId;
      this.givingId += 1;
      canvas.givingId = this.givingId;
    }
    else{
      group.id = groupID;
      text.id = groupID;
    }
    group.type = 'group';
    group.editing = editing;
    group.setControlsVisibility(this.constants.HideControls);
    this.addEventListeners(canvas, group, renderer);
    canvas.add(group);
    this.userDatabase.sendingCanvas(canvas.toJSON(['id', 'connections', 'givingId', 'editing']));
    return group;
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
    this.selectedGroup.push(group);
    group.editing = true;
    this.userDatabase.sendingCanvas(canvas.toJSON(['id', 'connections', 'givingId', 'editing']));
    const items = group._objects;
    group._restoreObjectsState();
    canvas.remove(group);
    for (const item of items) {
      canvas.add(item);
    }
    canvas.renderAll();
  }

  regroup(shape: fabric.Object, text: fabric.IText,
          canvas: fabric.Canvas, renderer: Renderer2) {
    let g: fabric.Group;
    let  u = 0;
    for (const ob of this.selectedGroup){
      if (ob.id === text.id){
        g = ob;
        break;
      }
      u++;
    }
    const groupCoord = g.getPointByOrigin(0, 0);
    canvas.remove(shape);
    canvas.remove(text);
    this.createGroup(
      shape,
      text,
      canvas,
      groupCoord.x,
      groupCoord.y,
      g.connections,
      renderer,
      g.id,
      false,
      g.angle,
      1,
      1
    );
    this.selectedGroup.splice(u, 1);
    this.userDatabase.sendingCanvas(canvas.toJSON(['id', 'connections', 'givingId', 'editing']));
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
    group1.connections.push({ name: 'p1', line, connectedGroup: group2.id });
    group2.connections.push({ name: 'p2', line, connectedGroup: group1.id });
    canvas.connect = false;
    canvas.connectButtonText = this.constants.connectText;
    this.userDatabase.sendingCanvas(canvas.toJSON(['id', 'connections', 'givingId', 'editing']));
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
    this.userDatabase.sendingCanvas(canvas.toJSON(['id', 'connections', 'givingId', 'editing']));
  }

  addDeleteBtn(x: number, y: number, canvas: fabric.Canvas, renderer: Renderer2) {
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
    renderer.appendChild(document.getElementsByClassName('canvas-container')[0], delteBtn);
    document.getElementById('deleteBtn').addEventListener('click', (event) => {
      this.delete(canvas);
    });
    this.userDatabase.sendingCanvas(canvas.toJSON(['id', 'connections', 'givingId', 'editing']));
  }

  addEventListeners(canvas: fabric.Canvas, group: fabric.Group, renderer: Renderer2) {
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
            }, );
            canvas.selectedElements.pop();
            canvas.selectedElements.pop();
          }
        } else {
          group.isEditable = false;
          this.socketService.somethingModified(group.id, this.currentUser, this.constants.roomID);
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
