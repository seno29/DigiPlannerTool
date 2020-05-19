import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { TextBoxService } from './text-box.service';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {

  constructor(private textService: TextBoxService) { }

  addRectangle(canvas, color){
    console.log(color);
    const rect = new fabric.Rect({
      width: 100,
      height: 100,
      fill: color,
      opacity: 0.5,
    });
    const text = this.textService.addText(rect, canvas);
    this.textService.createGroup(rect, text, canvas, 100, 100);
  }
}
