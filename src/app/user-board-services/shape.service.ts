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

  initCanvas(roomCode){
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
    this.getTitleFromDatabase(roomCode, canvas);
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
    this.addText(ellipse, canvas, renderer);
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
    this.addText(rect, canvas, renderer);
  }

  addImage(canvas: fabric.Canvas, imageURL: string, renderer: Renderer2) {
    const imgURL = imageURL || this.constants.starIconURL;
    const imageEle = new Image();
    imageEle.src = imgURL;
    imageEle.onload = () => {
      const image = new fabric.Image(imageEle, {
        originX: 'center',
        originY: 'center',
        scaleX: 0.3,
        scaleY: 0.3,
        selectable: false,
      });
      this.addText(image, canvas, renderer);
    };
  }

  addText(
    shape: fabric.Object,
    canvas: fabric.Canvas,
    renderer: Renderer2
  ): fabric.IText {
    const text = new fabric.IText('Double click to edit', {
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
    this.groupService.createGroup(shape, text, canvas, 100, 100, [], renderer);
    // text.on('editing:exited', () => { this.groupService.regroup(shape, text, canvas, renderer); });
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
        this.groupService.getRoomId()
      );
      this.groupService.unGroup(group, canvas);
      shape.fill = color;
      this.groupService.regroup(shape, text, canvas, renderer);
    }
  }

  getTitleFromDatabase(roomCode: string, canvas: fabric.Canvas) {
    roomCode === 'unknown'
      ? (canvas.boardTitle = 'UserUI')
      : this.userDatabaseService.getRoomData(roomCode).subscribe(
          (roomData) => {
            canvas.boardTitle = roomData.room_title;
            canvas.loadFromJSON(roomData.canvas_json, () => {
              canvas.renderAll();
            });
            this.setBackground(canvas, roomData.base64);
          },
          (error) => {
            canvas.boardTitle = 'UserUI';
            this.setBackground(canvas, this.constants.userBackURL);
          }
        );
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
