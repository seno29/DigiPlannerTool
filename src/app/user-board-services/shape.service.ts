import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { TextBoxService } from './text-box.service';
import { ShapeInterFace } from '../user-board/user-board.component';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {

  constructor(private textService: TextBoxService) { }

  addEllipse(canvas:fabric.Canvas, color:string){
    const ellipse = new fabric.Ellipse({
     left : 10,
     top: 10,
     fill : color,
     rx:50,
     ry:30,
    });
    const text = this.textService.addText(ellipse, canvas);
    this.textService.createGroup(rect, text, canvas, 100, 100);
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
      
    const text = this.textService.addText(rect, canvas);
    this.textService.createGroup(rect, text, canvas, 100, 100););
     }

      addImage(canvas:fabric.Canvas){
      fabric.Image.fromURL("https://i.dlpng.com/static/png/6661426_preview.png", function(img){
        let scale = 300 / img.width;

       img.set({
         scaleX: scale,
          scaleY: scale
        });
       
      });
      const text = this.textService.addText(rect, canvas);
    this.textService.createGroup(rect, text, canvas, 100, 100););
      
      }

 
}
