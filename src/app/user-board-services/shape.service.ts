import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { TextBoxService } from './text-box.service';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {

  constructor(private textService: TextBoxService) { }

  addEllipse(canvas: fabric.Canvas, color: string){
    const ellipse = new fabric.Ellipse({
    originX: 'center',
    originY: 'center',
    fill : color,
    rx: 100,
    ry: 50,
    selectable: false
    });
    const text = this.textService.addText(ellipse, canvas);
    const group = this.textService.createGroup(ellipse, text, canvas, 100, 100, []);
    return group;
  }

  addRectangle(canvas: fabric.Canvas, color: string) {
    const rect = new fabric.Rect({
      originX: 'center',
      originY: 'center',
      width: 200,
      height: 100,
      fill: color,
      selectable: false
    });
    const text = this.textService.addText(rect, canvas);
    const group = this.textService.createGroup(rect, text, canvas, 100, 100, []);
    return group;
  }

  addImage(canvas: fabric.Canvas){
    const image = fabric.Image.fromURL('https://i.dlpng.com/static/png/6661426_preview.png', (img) => {
      const scale = 300 / img.width;
      img.set({
         scaleX: scale,
         scaleY: scale,
         selectable: false
      });
    });
    const text = this.textService.addText(image, canvas);
    const group = this.textService.createGroup(image, text, canvas, 100, 100, []);
    return group;
  }



}
