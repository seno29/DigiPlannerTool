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
    canvas.undoMode=false;
    canvas.deleteText = 'Delete';
    canvas.undoArray=[];
    canvas.redoArray=[];
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
    const text = this.textService.addText(ellipse, canvas);
    this.textService.createGroup(ellipse, text, canvas, 100, 100, []);
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

    this.textService.addText(rect, canvas);

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
      this.textService.addText(image, canvas);
    };
  }

}
