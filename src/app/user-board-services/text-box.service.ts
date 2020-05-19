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
      fontFamily: 'arial black',
      fill: '#333',
      fontSize: 20,
    });

    // Added on focus remove listener
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
    // console.log(this.editingGroupCoord);
    // console.log(group);
    const items = group._objects;
    group._restoreObjectsState();
    canvas.remove(group);
    for (const item of items) {
        canvas.add(item);
    }
    // if you have disabled render on addition
    canvas.renderAll();
  }

  createGroup(shape, text, canvas, x, y): void{
    console.log(`shape: ${shape},\n
     text: ${text}`);
    const group = new fabric.Group([shape, text], {
      left: x,
      top: y,
    });
    group.on('mousedown', this.doubleClickEvent(group, (obj) => {
      this.unGroup(group, canvas);
      canvas.setActiveObject(text);
      text.enterEditing();
      text.selectAll();
    }));
    canvas.add(group);
    this.setOpacity(canvas, 0.5)
  }

  setOpacity(canvas, opacity){
    canvas.forEachObject( (obj) => { obj.opacity = opacity; });
    canvas.renderAll();
  }
}
