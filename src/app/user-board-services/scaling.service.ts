import { Injectable } from '@angular/core';

import { fabric } from 'fabric';

@Injectable({
  providedIn: 'root'
})
export class ScalingService {

  constructor() { }

  scaleBoard(canvas: fabric.Canvas, aspectRatio: number){
    const width = window.innerWidth * 0.7;
    const height = width * aspectRatio;
    console.log(width + ' hello ' + height);
    canvas.setHeight(height);
    canvas.setWidth(width);
  }
}
