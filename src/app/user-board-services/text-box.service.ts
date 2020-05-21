import { Injectable } from '@angular/core';
import { fabric } from 'fabric';

@Injectable({
  providedIn: 'root'
})
export class TextBoxService {

  editingGroupCoord;
  editingGroupConnections;
  groupList=[];
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
    text.on('editing:exited', () => {
     /*const mgroup= this.makeGroup(shape,text,this.editingGroupCoord.x, this.editingGroupCoord.y);
      this.groupList.push(mgroup);
      console.log(this.groupList);*/
      this.createGroup(shape, text, canvas, this.editingGroupCoord.x, this.editingGroupCoord.y, this.editingGroupConnections);
    });
    
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
  makeGroup(shape, text, x,y):fabric.Group{
    const group = new fabric.Group([shape, text], {
      left: x,
      top: y,
    });
    return group;
  }
  unGroup(group, canvas){
    this.editingGroupCoord = group.getPointByOrigin(0, 0);
    this.editingGroupConnections = group.connections;
    const items = group._objects;
    group._restoreObjectsState();
    canvas.remove(group);
    canvas.shapesPresent.pop();
    for (const item of items) {
        canvas.add(item);
    }
    canvas.renderAll();
  }

  deleteGroup(group, canvas){
    for (const connection of group.connections){
      for (let j = 0 ; j < connection.connectedGroup.connections.length; j++){
        const groupC = connection.connectedGroup.connections;
        if (groupC[j].connectedGroup === group){
          groupC.splice(j, 1);
        }
      }
      canvas.remove(connection.line);
    }
    canvas.delete = false;
    canvas.deleteButtonText = 'Delete';

    
    canvas.remove(group);
    canvas.renderAll();
   
  }
    /*if(canvas.delete){
      var activeObject = canvas.getActiveObject(),
      activeGroup = canvas.getActiveGroup();
      if (activeObject) {
         
              canvas.remove(activeObject);
          
      }
      else if (activeGroup) {
          
              var objectsInGroup = activeGroup.getObjects();
              canvas.discardActiveGroup();
              objectsInGroup.forEach(function(object) {
              canvas.remove(object);
              });*/
         
      
      
        
     
     
     
   

  createGroup(shape, text, canvas, x, y, connections: Array<{name: string, line: fabric.Line}>){
    this.setDimen(shape, text.getBoundingRect());
    shape.selectable = false;
    text.selectable = false;
    const group = new fabric.Group([shape, text], {
      left: x,
      top: y,
    });
    group.connections = connections;
    // Event Listener for double click on group
    group.on('mousedown', this.doubleClickEvent(group, () => {
      if (canvas.connect){
        canvas.selectedElements.push(group);
        if (canvas.selectedElements.length === 2){ this.drawLineTwoPoints(canvas); }
      }
      else if (canvas.delete){
          this.deleteGroup(group,canvas);
        
      }
      else{
      
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
    canvas.shapesPresent.push(group);
    
    return group;
  }


  setDimen(shape, textBoundingRect){
    if (shape.height < textBoundingRect.height){
      shape.height = textBoundingRect.height + 20;
    }
    if (shape.width < textBoundingRect.width){
      shape.width = textBoundingRect.width + 20;
    }
  }

  drawLineTwoPoints(canvas) {
    const from = canvas.selectedElements[0].getCenterPoint(0, 0);
    const to = canvas.selectedElements[1].getCenterPoint(0, 0);
    const line = this.makeLine([from.x, from.y, to.x, to.y]);
    canvas.add(line);
    canvas.sendToBack(line);
    canvas.selectedElements[0].connections.push({name: 'p1', line});
    canvas.selectedElements[1].connections.push({name: 'p2', line});
    canvas.connect = false;
    canvas.connectButtonText = 'Connect';
    console.log('Line :' + line + '\nGroup1: ' + canvas.selectedElements[0] + '\nGroup2:' + canvas.selectedElements[1]);
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

  makeLine(coords){
    return new fabric.Line(coords, {
      stroke: 'black',
      strokeWidth: 2,
      opacity: 0.7,
      selectable: false,
  });
  }
}
