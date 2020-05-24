import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { ScalingService } from './scaling.service';

@Injectable({
  providedIn: 'root'
})
export class TextBoxService {

  editingGroupCoord: fabric.Point;
  editingGroupConnections: Array<{name: string, line: fabric.Line, connectedWith: fabric.Group}>;

  constructor(private scalingService: ScalingService) { }

  addText(shape: fabric.Object, canvas: fabric.Canvas): fabric.IText{
    const text = new fabric.IText('Double click to edit', {
      fill: '#333',
      fontSize: 15,
      originX: 'center',
      originY: 'center',
      textAlign: 'center',
      fontFamily: 'Segoe UI',
      top: 0,
      left: 0,
      selectable: false,
    });

    text.on('editing:exited', () => {
      canvas.remove(shape);
      canvas.remove(text);
      this.createGroup(shape, text, canvas, this.editingGroupCoord.x, this.editingGroupCoord.y, this.editingGroupConnections);
    });
    this.createGroup(shape, text, canvas, 100, 100, []);
  }

  makeLine(coords: fabric.Point){
    return new fabric.Line(coords, {
      stroke: 'black',
      strokeWidth: 2,
      opacity: 0.6,
      selectable: false,
      preserveObjectStacking: true,
  });
  }

  createGroup(shape: fabric.Object, text: fabric.Itext, canvas: fabric.Canvas,
              x: number, y: number, connections: Array<{name: string, line: fabric.Line, connectedWith: fabric.Group}>){
    this.scalingService.scaleShapes(shape, text.getBoundingRect());
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
      else if (canvas.deleteMode){
        this.delete(canvas, group);
      }
      else{
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
    canvas.undoArray.push(group);
    return group;

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

  unGroup(group: fabric.Group, canvas: fabric.Canvas){
    this.editingGroupCoord = group.getPointByOrigin(0, 0);
    this.editingGroupConnections = group.connections;
    const items = group._objects;
    group._restoreObjectsState();
    canvas.remove(group);
    canvas.undoArray.pop();
    for (const item of items) {
        canvas.add(item);
    }
    canvas.renderAll();
  }

  drawLineTwoPoints(canvas: fabric.Canvas) {
    const group1 = canvas.selectedElements[0];
    const group2 = canvas.selectedElements[1];
    const line = this.makeLine([group1.getCenterPoint().x, group1.getCenterPoint().y,
                                group2.getCenterPoint().x, group2.getCenterPoint().y]);
    canvas.add(line);
    canvas.sendToBack(line);
    group1.connections.push({name: 'p1', line, connectedGroup: group2});
    group2.connections.push({name: 'p2', line, connectedGroup: group1});

    canvas.connect = false;
    canvas.connectButtonText = 'Connect';
  }

  moveLines(group: fabric.Group){
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

  delete(canvas: fabric.Canvas, group: fabric.Group){
    for (const connection of group.connections){
      // tslint:disable-next-line: forin
      for (const index in connection.connectedGroup.connections){
        const otherGroupConnections = connection.connectedGroup.connections;
        if (otherGroupConnections[index].connectedGroup === group){
          otherGroupConnections.splice(index, 1);
        }
      }
      canvas.remove(connection.line);
    }
    canvas.remove(group);
    canvas.renderAll();
    canvas.deleteMode = false;
    canvas.deleteText = 'Delete';
  }
}
