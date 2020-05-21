import { Injectable, Optional } from '@angular/core';
import { fabric } from 'fabric';
import { TextBoxService } from './text-box.service';
import { ScalingService } from './scaling.service';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {

  constructor(private textService: TextBoxService, private scalinService: ScalingService) { }

  initCanvas(){
    fabric.Object.prototype.transparentCorners = false;
    const canvas = new fabric.Canvas('canvas-container', {
      hoverCursor: 'pointer',
      selection: true
    });
    this.scalinService.scaleBoard(canvas, 16 / 9);
    canvas.selectedElements = [];
    canvas.connect = false;
    canvas.connectButtonText = 'Connect';
    canvas.deleteMode = false;
    canvas.deleteText = 'Delete';
    return canvas;
  }

  addEllipse(canvas: fabric.Canvas, color: string){
    const ellipse = new fabric.Ellipse({
    originX: 'center',
    originY: 'center',
    fill : color,
    rx: 100,
    ry: 50,
    stroke : 'black',
    strokeWidth : 0.3,
    selectable: false,
    });
    // console.log(ellipse);
    const text = this.textService.addText(ellipse, canvas);
    const group = this.textService.createGroup(ellipse, text, canvas, 100, 100, []);
    return group;
  }

  addRectangle(canvas: fabric.Canvas, color: string) {
    const rect = new fabric.Rect({
      originX: 'center',
      originY: 'center',
      width: 200,
      height: 100,
      rx: 10,
      ry: 10,
      stroke : 'black',
      strokeWidth : 0.3,
      fill: color,
      selectable: false,
      strokeLineJoin: 'round',
    });
    const text = this.textService.addText(rect, canvas);
    const group = this.textService.createGroup(rect, text, canvas, 100, 100, []);
    return group;
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
        // console.log(image);
      const text = this.textService.addText(image, canvas);
      const group = this.textService.createGroup(image, text, canvas, 100, 100, []);
      return group;
    };
  }

}
