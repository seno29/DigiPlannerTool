import { Injectable } from '@angular/core';
import fabric from 'fabric';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {

  constructor() { }

  circle(circleRadius: number) {

  }

  /*line(pos, mode: string = 'brush') {

  }*/

  rectangle(width, height , fill, left ,top) : fabric.Shape {
      return new fabric.Rect({
          width : width,
          height : height,
          fill : fill ,
          left : left ,
          top : top
      })
  }
}