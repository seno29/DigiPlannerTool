import { Injectable } from '@angular/core';

import { fabric } from 'fabric';

@Injectable({
  providedIn: 'root'
})
export class ScalingService {

  constructor() { }


  scaleShapes(shape: fabric.Object, textBoundingRect) {
    let resize = false;
    const height = shape.height * shape.scaleY;
    const width = shape.width * shape.scaleX;
    resize = this.compareTextShape(shape, height, textBoundingRect.height) || this.compareTextShape(shape, width, textBoundingRect.width);

    if (shape instanceof fabric.Ellipse && resize) {
      if (shape.width < textBoundingRect.width) {
        shape.width = textBoundingRect.width + 60;
      }
      if (shape.height < textBoundingRect.height) {
        shape.height = textBoundingRect.height + 60;
      }
      shape.rx = shape.width / 2;
      shape.ry = shape.height / 2;
    }
  }

  compareTextShape(shape: fabric.Shape, shapeDimen: number, textDimen: number): boolean {
 if (shape instanceof fabric.Rect){
    if (shapeDimen < textDimen) {
      (shape.height * shape.scaleY) === shapeDimen ? shape.height = textDimen + 20 : shape.width = textDimen + 20;
      return true;
    }
    return false;
  }
 if (shape instanceof fabric.Triangle){
  if (shapeDimen / 2 < textDimen) {
    if ((shape.height * shape.scaleY) === shapeDimen) {
      shape.height = Math.max(shapeDimen, textDimen) * 1.5;
      shape.width *= 1.5;
    }
    else {
      shape.width = Math.max(shapeDimen, textDimen) * 2;
      shape.height *= 1.5;
     }
    return true;
  }
  return false;
  }
 return true;
 }
}
