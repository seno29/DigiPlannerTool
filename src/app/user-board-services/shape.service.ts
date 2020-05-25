import { Injectable, Optional, Renderer2 } from '@angular/core';
import { fabric } from 'fabric';
import { ScalingService } from './scaling.service';
import { GroupService } from './group.service';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {
  constructor(private groupService: GroupService) { }
  initCanvas(renderer){
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
    canvas.renderer = renderer;
    return canvas;
    
  }

  addEllipse(canvas: fabric.Canvas){
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
    this.addText(ellipse, canvas);
  }

  addRectangle(canvas: fabric.Canvas) {
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
    this.addText(rect, canvas);
  }

  addImage(canvas: fabric.Canvas, imageURL: string){
    const imgURL = imageURL || '../assets/stars-black-48dp.svg';

    const imageEle = new Image();
    imageEle.src = imgURL;
    let image;
    imageEle.onload = (img) => {
      image = new fabric.Image(imageEle, {
          originX: 'center',
          originY: 'center',
          scaleX: .30,
          scaleY: .30,
          selectable: false,
        });
      this.addText(image, canvas);
    };
  }

  addText(shape: fabric.Object, canvas: fabric.Canvas): fabric.IText{
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
    this.groupService.createGroup(shape, text, canvas, 100, 100, []);
    text.on('editing:exited', () => { this.groupService.regroup(shape, text, canvas); });
  }

}
