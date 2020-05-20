import { Component, OnInit } from '@angular/core';
import {fabric } from 'fabric';
import { ShapeService} from '../user-board-services/shape.service';
//import { FabricObjectType } from '../model';
@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css']
})

export class UserBoardComponent implements OnInit {
  shapesList: Array<ShapeInterFace> = [];
  canvas : fabric.Canvas;
  counter1 ;
  counter2 ;
  jsonArray = [];
  redo=[];
  undo=[];
  state;
  xDim = 900;
  yDim = 500;
  colors = ['red', 'blue', 'green', 'yellow', 'orange'];
  background= 'white';
  selectedColor: string;
  connectPressed: boolean;

  constructor(private shapeService: ShapeService) {
    this.selectedColor = 'red';
    this.connectPressed = false;
  }

  ngOnInit(): void {
    this.canvas = new fabric.Canvas('canvas-container', {
            isDrawingMode: false,
    });

    this.canvas.setHeight(this.yDim);
   this.canvas.setWidth(this.xDim);
    this.counter1 = 0;
    this.counter2 = 0;
    this.save();
    this.canvas.on('object:modified', function() {
      this.save();
    });
  }

  
   save():void {
    // clear the redo stack
    this.redo = [];
    $('#redo').prop('disabled', true);
    // initial call won't have a state
    if (this.state) {
     this.undo.push(this.state);
      $('#undo').prop('disabled', false);
    }
    this.state = JSON.stringify(this.canvas);
  }

   replay(playStack, saveStack, buttonsOn, buttonsOff): void {
    saveStack.push(this.state);
    this.state = playStack.pop();
    var on = $(buttonsOn);
    var off = $(buttonsOff);
    // turn both buttons off for the moment to prevent rapid clicking
    on.prop('disabled', true);
    off.prop('disabled', true);
    this.canvas.clear();
    this.canvas.loadFromJSON(this.state, function() {
      this.canvas.renderAll();
      // now turn the buttons back on if applicable
      on.prop('disabled', false);
      if (playStack.length) {
        off.prop('disabled', false);
      }
    });
  }

  /*addCircle() {
   this.shapeService.addCircle(this.canvas, this.selectedColor);
   
  }*/ 
  
  addEllipse(){
    this.shapeService.addEllipse(this.canvas,this.selectedColor);
    this.canvas.renderAll();
    this.save();
  }

  addRectangle() {
    this.shapeService.addRectangle(this.canvas,this.selectedColor);
    this.canvas.renderAll();
    this.save();
     }

  addImage (){
    this.shapeService.addImage(this.canvas);
    this.canvas.renderAll();
    this.save();
  }

  doUndo() {
    this.replay(this.undo, this.redo, '#redo', this);
  }
 doRedo()  {
    this.replay(this.redo, this.undo, '#undo', this);
  }

  clear() {
    if (confirm('Do you want to clear')) {
      this.canvas.clear();
     // this.canvas.backgroundColor = this.background ;
    // this.canvas.setHeight(this.yDim);
     // this.canvas.setWidth(this.xDim);
      this.counter1 = this.jsonArray.length;
      this.counter2 = this.counter1;
    }
  }


  }

  export interface ShapeInterFace{
   // name : string;
    color: string;
    
  }
  


