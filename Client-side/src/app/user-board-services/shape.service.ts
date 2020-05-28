import { Injectable, Optional, Renderer2 } from '@angular/core';
import { fabric } from 'fabric';
import { ScalingService } from './scaling.service';
import { GroupService } from './group.service';
import { SocketService } from '../services/socket.service';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {
  arr = ['connections', 'isEditable', 'isMoving', '__corner', '__controlsVisibility', 
        'aCoords', 'includeDefaultValues', 'matrixCache', 'selectable', 'cacheTranslationX',
        'cacheTranslationY', 'fromPaste', 'hasControls', 'hiddenTextarea', 'hoverCursor',
        'isEditing', 'lockMovementX', 'lockMovementY', 'selected', 'selectionEnd',
        'selectionStart', '_textBeforeEdit', '_cacheContext', '_cacheProperties',
        '_clickHandlerInitialized', '_currentCursorOpacity', '_currentTickCompleteState',
        '_cursorTimeout1', '_cursorTimeout2', '_forceClearCache', '_savedProps'];
  constructor(private groupService: GroupService, private ser: SocketService) { }

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
    let image;
    imageEle.onload = (img) => {
      image = new fabric.Image(imageEle, {
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
    // var g = this.groupService.createGroup(shape, text, canvas, 100, 100, [], renderer);
    this.groupService.createGroup(shape, text, canvas, 100, 100, [], renderer);
    // text.on('editing:exited', () => { console.log("hELLO tEXT"); this.ser.regr(canvas); this.groupService.regroup(shape, text, canvas, renderer);});
    // return g;
  }

}
