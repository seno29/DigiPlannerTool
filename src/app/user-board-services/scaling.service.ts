import { Injectable } from '@angular/core';

import { fabric } from 'fabric';

@Injectable({
  providedIn: 'root'
})
export class ScalingService {

  constructor() { }


  scaleShapes(shape: fabric.Object, textBoundingRect){
    let resize = false;
    const height = shape.height * shape.scaleY;
    const width = shape.width * shape.scaleX;
    resize = this.compareTextShape(shape, height, textBoundingRect.height);
    resize = this.compareTextShape(shape, width, textBoundingRect.width);

    if (shape instanceof fabric.Ellipse && resize){
      if (shape.width < textBoundingRect.width ){
        shape.width += 60;
        shape.height = textBoundingRect.height + 20;
      }
      if (shape.height < textBoundingRect.height){
        shape.width = textBoundingRect.width + 20;
        shape.height += 60;
      }
      shape.rx = shape.width / 2;
      shape.ry = shape.height / 2;
    }
  }

  compareTextShape(shape: fabric.Shape, shapeDimen: number, textDimen: number): boolean{
    if (shapeDimen < textDimen  ){
      if (shape instanceof fabric.Image){
        const scale = (textDimen + 80) / 512;
        shape.scaleY = scale;
        shape.scaleX = scale;
      }
      else{
        if ((shape.height * shape.scaleY) === shapeDimen){
          shape.height = textDimen + 20;
        }
        else{
          shape.width = textDimen + 20;
        }
      }
      return true;
    }
    return false;
  }
}
