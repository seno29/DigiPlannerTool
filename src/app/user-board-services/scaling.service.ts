import { Injectable } from '@angular/core';

import { fabric } from 'fabric';

@Injectable({
  providedIn: 'root'
})
export class ScalingService {

  constructor() { }

  scaleBoard(canvas: fabric.Canvas, aspectRatio: number){
    const width = window.innerWidth * 0.70 - 10;
    const height = width / aspectRatio;
    canvas.setHeight(height);
    canvas.setWidth(width);
    canvas.renderAll();
  }

  scaleShapes(shape, textBoundingRect){
    let resize = false;
    const height = shape.height * shape.scaleY;
    const width = shape.width * shape.scaleX;
   
    if (height < textBoundingRect.height  ){
      if (shape instanceof fabric.Image){
        const scale = (textBoundingRect.height + 80) / 512;
        shape.scaleY = scale;
        shape.scaleX = scale;
      }
      else{
        shape.height = textBoundingRect.height + 20;
      }
      resize = true;
    }
    if (width < textBoundingRect.width){
      if (shape instanceof fabric.Image){
        const scale = (textBoundingRect.width + 80) / 512;
        shape.scaleY = scale;
        shape.scaleX = scale;
      }
      else{
        shape.width = textBoundingRect.width + 20;
      }
      resize = true;
    }
    
    if (shape instanceof fabric.Ellipse && resize){
      if( shape.width<textBoundingRect.width ){
        shape.width += 60;
        shape.height = textBoundingRect.height+ 20;
      }
      if(shape.height<textBoundingRect.height){
        shape.width = textBoundingRect.width + 20;
        shape.height += 60; 
      }
          
      shape.rx = shape.width / 2;
      shape.ry = shape.height / 2;
    }
  }

  setOpacity(canvas, opacity){
    canvas.forEachObject( (obj) => {
      obj.setOpacity(0.5);
    });
    canvas.renderAll();
  }

  // 90% implemented just have to fix a few allignment issues
  // // To scale Text
  // assignEventListenersCanvas(canvas){
  //   canvas.on('object:scaling', (event) => {this.scaleText(canvas, event.target); });
  //   canvas.on('mouse:up', (event) => {this.scaleGroup(canvas, event.target); });
  // }

  // // index:1 => text
  // scaleText(canvas, group){
  //       const textBox = group._objects[0];
  //       // console.log(group.height * group.scaleY + "///" + group.width * group.scaleX);
  //       const newHeight = group.height * group.scaleY;
  //       const newWidth = group.width * group.scaleX;
  //       const fontSize = 12 * newHeight * 0.02;
  //       // console.log(newHeight + " /// " + newWidth);
  //       textBox.set({
  //         fontSize,
  //         scaleX: group.scaleX,
  //         scaleY: group.scaleY
  //       });
  //       textBox.setCoords();
  //       group.setCoords();
  //       canvas.renderAll();
  // }

  // scaleGroup(canvas, group){
  //       const shape = group._objects[0];
  //       const textBox = group._objects[1];
  //       const height = group.height * group.scaleY;
  //       const width = group.width * group.scaleX;
  //       // console.log(height + " -- " + width);
  //       const fontSize = 12 * height * 0.02;
  //       group.set({
  //         height,
  //         width,
  //         scaleX: 1,
  //         scaleY: 1
  //       });
  //       shape.height = height;
  //       shape.width = width;
  //       textBox.fontSize = fontSize;
  //       group.setCoords();
  //       canvas.renderAll();
  // }

}