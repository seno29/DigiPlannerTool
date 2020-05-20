import { Injectable } from '@angular/core';
import { fabric } from 'fabric';

@Injectable({
  providedIn: 'root'
})
export class TextBoxService {

  editingGroupCoord;

  constructor() { }

  addText(shape, canvas): fabric.IText{
    const text = new fabric.IText('Tap', {
      fill: '#333',
      fontSize: 20,
      originX: 'center',
      originY: 'center',
      textAlign: 'center',
      fontFamily: 'Segoe UI',
      top: 0,
      left: 0,
    });
    // Event listener on Itext
    text.on('editing:exited', () => { this.createGroup(shape, text, canvas, this.editingGroupCoord.x, this.editingGroupCoord.y); });
    return text;
  }

  doubleClickEvent(obj, handler){
    return () => {
      if (obj.clicked) { handler(obj); }
      else {
          obj.clicked = true;
          setTimeout(() => {
              obj.clicked = false;
          }, 500);
      }
  };
  }

  unGroup(group, canvas){
    this.editingGroupCoord = group.getPointByOrigin(0, 0);
    const items = group._objects;
    group._restoreObjectsState();
    canvas.remove(group);
    for (const item of items) {
        canvas.add(item);
    }
    canvas.renderAll();
  }

  createGroup(shape, text, canvas, x, y){
    const textBoundingRect = text.getBoundingRect();
    this.setDimen(shape, textBoundingRect);
    shape.selectable = false;
    text.selectable = false;
    const group = new fabric.Group([shape, text], {
      left: x,
      top: y,
    });
    // Event Listener for double click on group
    group.on('mousedown', this.doubleClickEvent(group, (obj) => {
      this.unGroup(group, canvas);
      canvas.setActiveObject(text);
      text.enterEditing();
      text.selectAll();
    }));
    canvas.add(group);
    this.setOpacity(canvas, 0.7);
    return group;
  }

  setOpacity(canvas, opacity){
    canvas.forEachObject( (obj) => { obj.opacity = opacity; });
    canvas.renderAll();
  }

  //set dimension according to text
  setDimen(shape, textBoundingRect){
    let resize = false;
    if (shape.height < textBoundingRect.height){
      shape.height = textBoundingRect.height + 20;
      resize = true;
    }
    if (shape.width < textBoundingRect.width){
      shape.width = textBoundingRect.width + 20;
      resize = true;
    }
    if (resize){
      shape.top = textBoundingRect.top * textBoundingRect.scaleY;
      shape.left = textBoundingRect.left * textBoundingRect.scaleX;
    }
  }
}
