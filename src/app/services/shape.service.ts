import { Injectable } from '@angular/core';
import { fabric}  from 'fabric';
import { ShapeInterFace } from '../user-board/user-board.component';
//import {DrawingColours, FabricObjectType} from '../user-board/model';

/*@Injectable({
  providedIn: 'root'
})*/


export class ShapeService {

  constructor() { }
  

  

  circle(canvas : fabric.Canvas) {
    const circle = new fabric.Circle({
      radius : 50,
        fill: 'red',
        opacity: 0.5,
        left: 10,
        top: 10,
      });
    
    canvas.add(circle);
      }


  
  rectangle(canvas: fabric.Canvas, color:string) {
    const rect = new fabric.Rect({
      width: 100,
        height: 100,
        fill: color,
        opacity: 0.5,
        left: 10,
        top: 10,
      });
    
    canvas.add(rect);
      }

 
}