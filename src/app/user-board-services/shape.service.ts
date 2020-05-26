import { Injectable, Optional, Renderer2 } from '@angular/core';
import { fabric } from 'fabric';
import { GroupService } from './group.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {

  constructor(private groupService: GroupService, private http: HttpClient) { }

  initCanvas(backURL: string){
    fabric.Object.prototype.transparentCorners = false;
    const canvas = new fabric.Canvas('canvas', {
      hoverCursor: 'pointer',
      selection: true
    });
    canvas.setHeight(650);
    canvas.setWidth(1200 - 10);
    canvas.selectedElements = [];
    canvas.connect = false;
    canvas.connectButtonText = 'Connect';
    canvas.selectedColor = 'cornsilk';
    const imageURL = backURL || '../assets/back.txt';
    const imageEle = new Image();
    this.http.get(imageURL).subscribe(data => {
      imageEle.src = data as string;
      imageEle.onload = () => {
        const image = new fabric.Image(imageEle, {
          width: canvas.width,
          height: canvas.height,
          opacity: 0.4,
        });
        canvas.setBackgroundImage(image);
        canvas.renderAll();
      };
    });
    return canvas;
  }

  addEllipse(canvas: fabric.Canvas, renderer: Renderer2){
    const ellipse = new fabric.Ellipse({
    originX: 'center',
    originY: 'center',
    fill : canvas.selectedColor,
    rx: 100,
    ry: 50,
    stroke : 'black',
    strokeWidth : 0.3,
    selectable: false,
    });
    this.addText(ellipse, canvas, renderer);
  }

  addRectangle(canvas: fabric.Canvas, renderer: Renderer2) {
    const rect = new fabric.Rect({
      originX: 'center',
      originY: 'center',
      width: 200,
      height: 100,
      rx: 10,
      ry: 10,
      stroke : 'black',
      strokeWidth : 0.3,
      fill: canvas.selectedColor,
      selectable: false,
      strokeLineJoin: 'round',
    });
    this.addText(rect, canvas, renderer);
  }

  addImage(canvas: fabric.Canvas, imageURL: string, renderer: Renderer2){
    const imgURL = imageURL || '../assets/stars-black-48dp.svg';

    const imageEle = new Image();
    imageEle.src = imgURL;
    imageEle.onload = () => {
      const image = new fabric.Image(imageEle, {
          originX: 'center',
          originY: 'center',
          scaleX: .30,
          scaleY: .30,
          selectable: false,
        });
      this.addText(image, canvas, renderer);
    };
  }

  addText(shape: fabric.Object, canvas: fabric.Canvas, renderer: Renderer2): fabric.IText{
    const text = new fabric.IText('Double click to edit', {
      fill: '#333',
      fontSize: 15,
      originX: 'center',
      originY: 'center',
      textAlign: 'center',
      fontFamily: 'Segoe UI',
      top: 0,
      left: 0,
      selectable: false,
    });
    this.groupService.createGroup(shape, text, canvas, 100, 100, [], renderer);
    text.on('editing:exited', () => { this.groupService.regroup(shape, text, canvas, renderer); });
  }

  changeColor(canvas: fabric.Canvas, color: string, renderer: Renderer2){
    const group = canvas.getActiveObject();
    if (group){
      const shape = group._objects[0];
      const text = group._objects[1];
      this.groupService.unGroup(group, canvas);
      shape.fill = color;
      this.groupService.regroup(shape, text, canvas, renderer);
    }
  }

}
