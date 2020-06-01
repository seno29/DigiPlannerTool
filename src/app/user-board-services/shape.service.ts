import { Injectable, Renderer2 } from '@angular/core';
import { fabric } from 'fabric';
import { GroupService } from './group.service';
import { UserDatabaseService } from './user-database.service';
import { ConstantsService } from './constants.service';
import { SocketService } from '../socket-services/socket.service';

@Injectable({
  providedIn: 'root',
})
export class ShapeService {
  private image: fabric.Image;

  constructor(
    private groupService: GroupService,
    private userDatabaseService: UserDatabaseService,
    private constants: ConstantsService,
    private socketService: SocketService
  ) {}

  initCanvas(renderer: Renderer2){
    this.image = null;
    fabric.Object.prototype.transparentCorners = false;
    const canvas = new fabric.Canvas('canvas', {
      hoverCursor: 'pointer',
      selection: true,
    });
    canvas.setHeight(650);
    canvas.setWidth(1200 - 10);
    canvas.selectedElements = [];
    canvas.selectedColor = this.constants.colors[0];
    this.getTitleFromDatabase(canvas, renderer);
    return canvas;
  }

  setBackground(canvas: fabric.Canvas, base64: string) {
    canvas.connect = false;
    canvas.connectButtonText = 'Connect';
    if (this.image) {
      canvas.setBackgroundImage(this.image);
      canvas.renderAll();
    } else {
      const imageEle = new Image();
      imageEle.src = base64;
      imageEle.onload = () => {
        this.image = new fabric.Image(imageEle, {
          width: canvas.width,
          height: canvas.height,
          opacity: 0.7,
        });
        canvas.setBackgroundImage(this.image);
        canvas.renderAll();
      };
    }
  }

  addEllipse(canvas: fabric.Canvas, renderer: Renderer2, color?: string) {
    const ellipse = new fabric.Ellipse({
      originX: 'center',
      originY: 'center',
      fill: color ? color : canvas.selectedColor,
      rx: 100,
      ry: 50,
      stroke: 'black',
      strokeWidth: 0.3,
      selectable: false,
    });
    this.addText(ellipse, canvas, renderer, 'Double click to edit', -1, 100, 100, false, 0, 1, 1);
  }

  addRectangle(canvas: fabric.Canvas, renderer: Renderer2, color?: string) {
    const rect = new fabric.Rect({
      originX: 'center',
      originY: 'center',
      width: 200,
      height: 100,
      rx: 10,
      ry: 10,
      stroke: 'black',
      strokeWidth: 0.3,
      fill: color ? color : canvas.selectedColor,
      selectable: false,
      strokeLineJoin: 'round',
    });
    this.addText(rect, canvas, renderer, 'Double click to edit', -1, 100, 100, false, 0, 1, 1);
  }

  addTriangle(canvas: fabric.Canvas, renderer: Renderer2, color?: string){
    const triangle = new fabric.Triangle({
      originX: 'center',
      originY: 'center',
      width: 200,
      height: 150,
      rx: 10,
      ry: 10,
      stroke: 'black',
      strokeWidth: 0.3,
      fill: color ? color : canvas.selectedColor,
      selectable: false,
      strokeLineJoin: 'round',
    });
    this.addText(triangle, canvas, renderer, 'Double \ntap to edit', -1, 100, 100, false, 0, 1, 1);
  }

  addText(
    shape: fabric.Object,
    canvas: fabric.Canvas,
    renderer: Renderer2,
    textVal: string,
    groupID: number,
    x: number,
    y: number,
    editing: boolean,
    angle: number,
    scaleX: number,
    scaleY: number) {
    const text = new fabric.IText(textVal, {
      fill: '#333',
      charSpacing : 100,
      fontSize: 15,
      originX: 'center',
      originY: 'center',
      textAlign: 'center',
      fontFamily:  'Trebuchet MS',
      top: 0,
      left: 0,
      selectable: false,
    });
    this.addTextListener(canvas, shape, text, renderer);
    return this.groupService.createGroup(shape, text, canvas, x, y, [], renderer, groupID, editing, angle, scaleX, scaleY);
  }

  addTextListener(canvas, shape, text, renderer){
    text.on('editing:exited', () => {
      this.socketService.regr(text.text, text.id, this.constants.roomID);
      this.groupService.regroup(shape, text, canvas, renderer);
    });
  }

  changeColor(canvas: fabric.Canvas, color: string, renderer: Renderer2) {
    canvas.selectedColor = color;
    const group = canvas.getActiveObject();
    if (group) {
      const shape = group._objects[0];
      const text = group._objects[1];
      this.socketService.colorChange(
        group.id,
        color,
        this.constants.roomID
      );
      this.groupService.unGroup(group, canvas);
      shape.fill = color;
      this.groupService.regroup(shape, text, canvas, renderer);
      for (const obj of canvas._objects) {
        if (obj.id === text.id) {
          canvas.setActiveObject(obj);
          break;
        }
      }
    }
  }

  getTitleFromDatabase(canvas: fabric.Canvas, renderer) {
    this.constants.roomID === 'unknown'
      ? (canvas.boardTitle = 'UserUI')
      : this.userDatabaseService.getRoomData().subscribe(
          (roomData) => {
            canvas.boardTitle = roomData.room_title;
            if (roomData.canvas_json) {this.loadCanvas(canvas, JSON.parse(roomData.canvas_json), renderer); }
            this.setBackground(canvas, roomData.base64);
          },
          (error) => {
            canvas.boardTitle = 'UserUI';
            this.setBackground(canvas, this.constants.userBackURL);
          }
        );
  }

  loadCanvas(canvas: fabric.Canvas, canvasJson, renderer: Renderer2){
    const newCanvas = new fabric.Canvas();
    newCanvas.loadFromJSON(canvasJson);
    this.groupService.givingId = newCanvas.givingId;
    canvas.givingId = newCanvas.givingId;
    const groupArray = [];
    for (const object of newCanvas._objects){
      if (object.type === 'group'){
        const shape = object._objects[0];
        const groupCoord = object.getPointByOrigin(0, 0);
        const group = this.addText(shape, canvas, renderer, object._objects[1].text, object.id, groupCoord.x,
                                   groupCoord.y, object.editing, object.angle, object.scaleX, object.scaleY);
        groupArray.push(group);
      }
    }

    for (const group of groupArray){
      for (const object of newCanvas._objects){
        if (object.id === group.id){
          this.drawLinesWhileLoading(canvas, object, group);
        }
      }
    }

    for (const group of groupArray){
      if (group.editing){
        const shape = group._objects[0];
        const text = group._objects[1];
        text.fill = '#7f8c8d';
        text.fontStyle = 'italic';
        shape.set('opacity', 0.7);
        text.set('text', ` Someone is editing`);
        this.ungroupOnLoad(group, canvas);
        text.lockMovementX = false;
        text.lockMovementY = false;
      }
    }
    canvas.renderAll();
  }

  ungroupOnLoad(group, canvas){
    this.groupService.selectedGroup.push(group);
    group.editing = true;
    const items = group._objects;
    group._restoreObjectsState();
    canvas.remove(group);
    for (const item of items) {
      item.selectable = false;
      canvas.add(item);
    }
  }

  drawLinesWhileLoading(canvas, object, group){
    canvas.selectedElements.push(group);
    for (const connection of object.connections){
      if (connection.name === 'p1'){
        for (const connectedGroup of canvas._objects){
          if (connectedGroup.id === connection.connectedGroup){
            canvas.selectedElements.push(connectedGroup);
            this.groupService.drawLineTwoPoints(canvas);
            canvas.selectedElements.pop();
            break;
          }
        }
      }
    }
    canvas.selectedElements.pop();
  }
}

export class MockShapeService {
  initCanvas(url: string) {
    const canvas = {
      selectedColor: 'cornsilk',
      connect: false,
      connectButtonText: 'Connect',
      selectedElements: [],
      _objects: [1, 2],
      clear: () => {
        canvas._objects = [];
      },
    };
    return canvas;
  }

  changeColor(canvas, color) {
    canvas.selectedColor = color;
  }
}
