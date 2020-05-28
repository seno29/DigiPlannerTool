import { Component, OnInit, Renderer2 } from '@angular/core';
import { fabric } from 'fabric';

import { ShapeService } from '../user-board-services/shape.service';
import { GroupService } from '../user-board-services/group.service';
import { Socket } from 'ngx-socket-io';
import { SocketService } from '../services/socket.service';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';


@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css']
})

export class UserBoardComponent implements OnInit {
  colors: Array<string>;
  background: string;
  selectedColor: string;
  canvas: fabric.Canvas;
  constructor(private shapeService: ShapeService, private renderer: Renderer2, private groupService: GroupService, private ser: SocketService) {
    this.selectedColor = 'cornsilk';
    this.background = 'white';
    this.colors = ['cornsilk', 'cyan', 'aquamarine', 'thistle', 'salmon'];
  }

  ngOnInit(): void {
    this.canvas = this.shapeService.initCanvas(this.renderer);

    this.canvas.on("object:moving", (options) => {
      // delete this.canvas.__eventListeners["object:added"];
      // console.log(this.canvas.__eventListeners);
      // console.log(this.canvas.toJSON());
      // console.log(options.target);
      this.ser.sendCanvas(this.getAll());
      console.log(this.canvas);
      // console.log(this.canvas);
      // this.ser.sendCanvas(options.target.id);
    });

    this.ser.socket.on("canvasComing", (h: any) =>{
      // delete this.canvas.__eventListeners["object:added"];
      console.log("obj moving");
      this.canvas.loadFromJSON(
        h,
        this.canvas.renderAll.bind(this.canvas)
      );
      // console.log(JSON.parse(this.canvas));
      let gp = new Map();
      gp.clear();
      let ind = 0;
      for (const obj of this.canvas._objects){
        if(obj.type === "group"){
          this.groupService.addEventListeners(this.canvas, obj, obj._objects[1], this.renderer);
          gp.set(obj.id, obj);
        }
        else{
          // let co = [obj.x1, obj.y1, obj.x2, obj.y2];
          // lineMap.set(obj.id, this.groupService.makeLine(co, obj.id));
          // this.canvas.remove(obj);
          // this.canvas.add(lineMap.get(obj.id));
          // this.canvas.sendToBack(obj);
          // this.canvas.renderAll();
          this.canvas._objects.splice(ind, 1);
        }
        ind++;
      }
      //remaining part work to be done
      console.log("done");
      console.log(this.canvas);
      let f = this.canvas._objects;
      let k = this.canvas._objects.length;
      console.log(k);
      for(let j = 0; j < k; j++){
        if(f[j].type === "group"){
          this.canvas.selectedElements.push(f[j]);
          let dummy = JSON.parse(JSON.stringify(f[j].connections));
          let len = f[j].connections.length;
          f[j].connections.splice(0, len);
          for(let l = 0 ;l < len; l++){
            console.log(dummy);
            if(dummy[l].name === "p1"){
              let r = gp.get(dummy[l].i);
              this.canvas.selectedElements.push(r);
              let y = r.connections.length;
              for(let w = 0; w < y; w++)
              {
                if(r.connections[w].i === f[j].id){
                  r.connections.splice(w, 1);
                }
              }
              this.groupService.drawLineTwoPoints(this.canvas);
              this.canvas.selectedElements.pop();
            }
          }
          this.canvas.selectedElements.pop();
        }
      }
      this.canvas.renderAll();
      // for(const obj of this.canvas._objects){
      //   if(obj.type === "group"){
      //     if (obj.connections.length > 0){
      //       for (const connect of obj.connections){
      //         console.log(connect);
      //         connect.line = lineMap.get(connect.line.id);
      //         console.log(1212);
      //       }
      //     }
      //   }
      // }
      
    });

    this.ser.socket.on("addedObject", (h: any) =>{
      console.log("obj added");
      // delete this.canvas.__eventListeners["object:added"];
      // this.canvas.loadFromJSON(
      //   h,
      //   this.canvas.renderAll.bind(this.canvas)
      // );
      // this.canvas._objects[0].__eventListeners = ev;
      // var t = this.canvas._objects[0];
      // this.canvas.setActiveObject(t);
      // this.groupService.addEventListeners(this.canvas, t, t._objects[1], this.renderer);
      // console.log(this.canvas);
      // console.log(t._objects[1]);
      // console.log(JSON.stringify(h));
      this.shapeService.addRectangle(this.canvas, this.renderer);
    });

    // this.canvas.on("object:modified", (options) => {
    //   // console.log(this.canvas.__eventListeners);
    //   this.ser.somethingModified(this.canvas);
    //   // console.log(this.canvas.item(options.));
    // });

    this.ser.socket.on("modifiedObject", (h) =>{
      console.log("obj modified");
      // this.canvas.loadFromJSON(
      //   h,
      //   this.canvas.renderAll.bind(this.canvas)
      // );
      // console.log(this.canvas);
      var gr;
      for (const ob of this.canvas._objects){
          if(ob.id === h){
            gr = ob;
            break;
          }
      }
      var text = gr._objects[1];
      this.groupService.unGroup(gr, this.canvas)
      this.canvas.setActiveObject(text);
      text.lockMovementX = false;
      text.lockMovementY = false;
      // text.enterEditing();
      text.selectAll();
    });

    this.ser.socket.on("regrouping", (h: any) =>{
      var dummy = new fabric.Canvas();
      dummy.loadFromJSON(
        h ,dummy.renderAll.bind(dummy)
      );
      console.log("Regrouped");
      var gr = this.groupService.selectedGroup;
      var shape = gr._objects[0];
      this.canvas.remove(gr._objects[1]);
      var text;
      let i = 0;
      for (const obj of dummy._objects){
        if(obj.id === gr.id)
        {
          text = obj;
          break;
        }
        i++;
      }
      this.groupService.regroup(shape, text, this.canvas, this.renderer);
      console.log(this.canvas);
      // var gr = this.canvas._objects[0];
      // this.groupService.addEventListeners(this.canvas, gr, gr._objects[1], this.renderer);
    });

    this.canvas.on('text:editing:exited', (options) => { 
      console.log("hELLO tEXT"); 
      let gr = this.groupService.selectedGroup;
      this.ser.regr(this.canvas.toJSON(['id']));
      this.groupService.regroup(gr._objects[0], gr._objects[1], this.canvas, this.renderer);});

    this.ser.socket.on("drawingLines", (h: any) => {
      // console.log(h.f);
      // console.log(h.s);
      for (const obj of this.canvas._objects){
        if(h.f === obj.id||h.s === obj.id){
          this.canvas.selectedElements.push(obj);
        }
      }
      this.groupService.drawLineTwoPoints(this.canvas);
      this.canvas.selectedElements.splice(0, 2);
      console.log(this.canvas);
      console.log("drawing");
    });
  }

  addObj(){
    this.ser.somethingAdded(this.canvas);
  }

  addEllipse(){ this.shapeService.addEllipse(this.canvas, this.renderer);  }

  addRectangle() {this.shapeService.addRectangle(this.canvas, this.renderer); this.addObj();}

  addImage(){ this.shapeService.addImage(this.canvas, '', this.renderer);}

  clear() {
    if (confirm('Do you want to clear')) {
      this.canvas.clear();
    }
  }

  connect(){
    if (this.canvas.connect){
      this.canvas.connect = false;
      this.canvas.connectButtonText = 'Connect';
    }
    else{
      while (this.canvas.selectedElements.length > 0 ){
        this.canvas.selectedElements.pop();
      }
      this.canvas.connect = true;
      this.canvas.connectButtonText = 'Exit Connection Mode';
    }
  }

  changeColor(color: string){
    this.canvas.selectedColor = color;
    this.groupService.changeColor(this.canvas, color, this.renderer);
  }

  getAll(){
    var the = this.canvas.toJSON( ['connections', 'isEditable', 'isMoving', '__corner', '__controlsVisibility', 
      'aCoords', 'includeDefaultValues', 'matrixCache', 'selectable', 'cacheTranslationX',
      'cacheTranslationY', 'fromPaste', 'hasControls', 'hiddenTextarea', 'hoverCursor',
      'isEditing', 'lockMovementX', 'lockMovementY', 'selected', 'selectionEnd',
      'selectionStart', '_textBeforeEdit', '_cacheContext', '_cacheProperties',
      '_clickHandlerInitialized', '_currentCursorOpacity', '_currentTickCompleteState',
      '_cursorTimeout1', '_cursorTimeout2', '_forceClearCache', '_savedProps', 'id', 'preserveObjectStacking']);
    return the;
  }
}
