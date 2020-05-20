import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { TextBoxService } from './text-box.service';
import {ShapeInterface} from '../user-board/user-board.component';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {

  constructor(private textService: TextBoxService) { }

  addEllipse(canvas: fabric.Canvas, color: string): ShapeInterface{
    const ellipse = new fabric.Ellipse({
    originX: 'center',
    originY: 'center',
    fill : color,
    rx: 100,
    ry: 50,
    });
    console.log(ellipse);
    const text = this.textService.addText(ellipse, canvas);
    const group = this.textService.createGroup(ellipse, text, canvas, 100, 100);
    return {name: 'ellipse', object: group, text: text.text, connectingNodes: []};
  }

  addRectangle(canvas: fabric.Canvas, color: string) {
    const rect = new fabric.Rect({
      originX: 'center',
      originY: 'center',
      width: 200,
<<<<<<< HEAD
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
=======
      height: 100,
      fill: color,
    });
    const text = this.textService.addText(rect, canvas);
    const group = this.textService.createGroup(rect, text, canvas, 100, 100);
    return {name: 'rect', object: group, text: text.text, connectingNodes: []};
  }
>>>>>>> ca9b25b339d00fb65c3e77f1e1f768e98cb14d62

  addImage(canvas: fabric.Canvas){
    const image = fabric.Image.fromURL('https://i.dlpng.com/static/png/6661426_preview.png', (img) => {
      const scale = 300 / img.width;
      img.set({
         scaleX: scale,
<<<<<<< HEAD
          scaleY: scale
        });
        canvas.add(img);
=======
         scaleY: scale
>>>>>>> ca9b25b339d00fb65c3e77f1e1f768e98cb14d62
      });
    });
    const text = this.textService.addText(image, canvas);
    const group = this.textService.createGroup(image, text, canvas, 100, 100);
    return {name: 'image', object: group, text: text.text, connectingNodes: []};
  }
}
