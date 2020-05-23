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
    if (height < textBoundingRect.height){
      if (shape instanceof fabric.Image){
        const scale = (textBoundingRect.height + 150) / 512;
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
        const scale = (textBoundingRect.width + 150) / 512;
        shape.scaleY = scale;
        shape.scaleX = scale;
      }
      else{
        shape.width = textBoundingRect.width + 20;
      }
      resize = true;
    }
    if (shape instanceof fabric.Ellipse && resize){
      shape.height += 80;
      shape.width += 80;
      shape.rx = shape.width / 2;
      shape.ry = shape.height / 2;
    }
  }

}
