import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { ScalingService } from './scaling.service';

@Injectable({
  providedIn: 'root'
})
export class TextBoxService {

  editingGroupCoord;
  editingGroupConnections;

  constructor(private scalingService: ScalingService) { }

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
      selectable: false,
    });
    // Event listener on Itext
    text.on('editing:exited', () => {
      this.createGroup(shape, text, canvas, this.editingGroupCoord.x, this.editingGroupCoord.y, this.editingGroupConnections);
    });
    return text;
  }

  makeLine(coords){
    return new fabric.Line(coords, {
      stroke: 'black',
      strokeWidth: 2,
      opacity: 0.6,
      selectable: false,
      preserveObjectStacking: true,
  });
  }

  createGroup(shape, text, canvas, x, y, connections: Array<{name: string, line: fabric.Line, connectedWith: fabric.Group}>){
    this.scalingService.scaleShapes(shape, text.getBoundingRect());
    console.log(shape.opacity);
    const group = new fabric.Group([shape, text], {
      left: x,
      top: y,
      connections,
      isEditable: true,
    });
    group.on('mousedown', this.doubleClickEvent(group, () => {
      if (canvas.connect){
        canvas.selectedElements.push(group);
        if (canvas.selectedElements.length === 2){ this.drawLineTwoPoints(canvas); }
      }
      else{
        // this.setListenerConnect(canvas, group);
        group.isEditable = false;
        this.unGroup(group, canvas);
        canvas.setActiveObject(text);
        text.enterEditing();
        text.selectAll();
      }
    }));
    group.on('moving', (event) => {
      if (group.connections.length > 0){
        this.moveLines(group);
        canvas.renderAll();
      }
    });
    canvas.add(group);
    // this.scalingService.setOpacity(canvas, 0.5);
    return group;
  }

  // Assigning double click handler to groups
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
    this.editingGroupConnections = group.connections;
    const items = group._objects;
    group._restoreObjectsState();
    canvas.remove(group);
    for (const item of items) {
        canvas.add(item);
    }
    canvas.renderAll();
  }

  drawLineTwoPoints(canvas) {
    const group1 = canvas.selectedElements[0];
    const group2 = canvas.selectedElements[1];
    const line = this.makeLine([group1.getCenterPoint().x, group1.getCenterPoint().y,
                                group2.getCenterPoint().x, group2.getCenterPoint().y]);
    canvas.add(line);
    canvas.sendToBack(line);
    group1.connections.push({name: 'p1', line, connectedGroup: group2});
    group2.connections.push({name: 'p2', line, connectedGroup: group1});
    // console.log('dont cry ');
    canvas.connect = false;
    canvas.connectButtonText = 'Connect';
    // console.log('Line :' + line + '\nGroup1: ' + canvas.selectedElements[0] + '\nGroup2:' + canvas.selectedElements[1]);
  }

  moveLines(group){
    const newPoint = group.getCenterPoint();
    for (const connection of group.connections){
      if (connection.name === 'p1'){
        connection.line.set({
          x1: newPoint.x,
          y1: newPoint.y
        });
      }
      else{
        connection.line.set({
          x2: newPoint.x,
          y2: newPoint.y
        });
      }
    }
  }
}
