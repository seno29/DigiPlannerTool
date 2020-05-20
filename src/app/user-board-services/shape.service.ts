import { Injectable } from '@angular/core';
import { fabric}  from 'fabric';
import { ShapeInterFace } from '../user-board/user-board.component';
//import {DrawingColours, FabricObjectType} from '../user-board/model';

/*@Injectable({
  providedIn: 'root'
})*/


export class ShapeService {

  constructor() { }
  

  addEllipse(canvas:fabric.Canvas, color:string){
    const ellipse = new fabric.Ellipse({
     left : 10,
     top: 10,
     fill : color,
     rx:50,
     ry:30,
     opacity: 0.5,
    });
    canvas.add(ellipse);
  }

  /*addCircle(canvas : fabric.Canvas, color:string) {
    const circle = new fabric.Circle({
      radius : 50,
        fill: color,
        opacity: 0.5,
        left: 10,
        top: 10,
      });
    
    canvas.add(circle);
      }*/


  
  addRectangle(canvas: fabric.Canvas, color:string) {
    const rect = new fabric.Rect({
      width: 200,
        height: 100,
        fill: color,
        opacity: 0.5,
        left: 10,
        top: 10,
      });
      canvas.add(rect);
      }

      addImage(canvas:fabric.Canvas){
      fabric.Image.fromURL("http://clipart-library.com/img1/830512.png", function(img){
        
        let scale = 300 / img.width;

       img.set({
         scaleX: scale,
          scaleY: scale
        });
        canvas.add(img);
      });
      
      }

 
}