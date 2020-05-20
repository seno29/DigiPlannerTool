import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { ShapeService } from '../user-board-services/shape.service';
import { ScalingService } from '../user-board-services/scaling.service';
import { element } from 'protractor';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css']
})

export class UserBoardComponent implements OnInit {
  shapesList: Array<fabric.Group> = [];
  colors = ['red', 'blue', 'green', 'yellow', 'orange'];
  background = 'white';
  selectedColor: string;
  canvas: fabric.Canvas;
  shapesArray: Array<ShapeInterface>=[];
  canvasAspectRatio = 16 / 9;
  counter1 ;
  redoArray =[];
  undoArray=[];
  connectPressed: boolean;
  state1;
 
  constructor(private shapeService: ShapeService, private scaleService: ScalingService) {
    this.selectedColor = 'red';
    this.connectPressed = false;
    this.shapesArray = [];
    this.counter1=0;
    this.undoArray=this.shapeService.JSONarray;
    this.redoArray=[];
  }

  ngOnInit(): void {
    fabric.Object.prototype.transparentCorners = false;
    this.canvas = new fabric.Canvas('canvas-container', {
      hoverCursor: 'pointer',
      selection: true
    });
    this.scaleCanvas();
    // this.scaleService.assignEventListenersCanvas(this.canvas);
  
    
  }

  scaleCanvas(){
    const width = window.innerWidth * 0.7 - 10;
    const height = width / this.canvasAspectRatio;
    // console.log(width + ' hello ' + height);
    this.canvas.setHeight(height);
    this.canvas.setWidth(width);
  }
  doUndo() {
    if (this.counter1 >= 0) {
      this.canvas.loadFromJSON(
        this.undoArray[this.counter1],
        this.counter1--,
        this.canvas.renderAll.bind(this.canvas)
      );
    }
    else{
      return;
    }
  }

  doRedo() {
    if(this.counter1<this.undoArray.length){
      this.canvas.loadFromJSON(
        this.undoArray[this.counter1],
        this.counter1++,
        this.canvas.renderAll.bind(this.canvas)
      );
    }
    else{
      return;
    }
  }
 /*  Undo(playStack, saveStack):void {
    this.state1 = playStack.pop();
    saveStack.push(this.state1);
    //this.canvas.clear();
    this.canvas.loadFromJSON(playStack, ()=> {
    this.canvas.renderAll();
      
    });
  }
  Redo(playStack, saveStack):void {
    this.state1 = playStack.pop();
    saveStack.push(this.state1);
    this.canvas.clear();
    this.canvas.loadFromJSON(this.state1, ()=> {
    this.canvas.renderAll();
      
    });
  }
  doUndo(){
    this.Undo(this.undoArray,this.redoArray);
  }
  doRedo(){
    this.Undo(this.redoArray,this.undoArray);
  }
 /* save(object:fabric.Group) {
    this.redoArray.push(JSON.stringify(object));
    this.counter1 = this.redoArray.length-1;
  
  }*/

 
  
 
  /*doUndo() {
    this.redoArray.push(this.undoArray.pop());
    //this.canvas.clear();

    this.counter1=this.undoArray.length-1;

    if (this.counter1 >= 0) {
      this.canvas.loadFromJSON(this.redoArray,()=>{
        this.canvas.renderAll();
      });
        this.counter1--;
    }
   
  }

  doRedo() {
    this.undoArray.push(this.redoArray.pop());
       this.counter1=this.undoArray.length-1;
        this.canvas.loadFromJSON( this.undoArray[this.counter1],()=>{
          this.canvas.renderAll();
        }
           
      );
  }

 /* doUndo() {
     this.redoArray.push(this.shapesArray.pop());
     this.canvas.clear();
    this.shapesArray.forEach(element =>{
        if(element.name === "rect"){
          
        this.shapeService.addRectangle(this.canvas, this.selectedColor,element.x,element.y);
        }
        else if(element.name === "ellipse"){
          this.shapeService.addEllipse(this.canvas, this.selectedColor,element.x,element.y);
        }
        else if(element.name === "image"){
          this.shapeService.addImage(this.canvas);
        }
    });
  }*/

  /*doRedo() {
    this.Redo(this.redo, this.shapesArray)
  }*/
  addEllipse(){
    this.shapesArray.push(this.shapeService.addEllipse(this.canvas, this.selectedColor));
        
  
  }

  addRectangle() {
    this.shapesArray.push(this.shapeService.addRectangle(this.canvas, this.selectedColor));
   
  }

  addImage(){
    this.shapesArray.push(this.shapeService.addImage(this.canvas));
    
  }

  clear() {
    if (confirm('Do you want to clear')) {
      this.canvas.clear();
      this.scaleCanvas();
     
      
    }
  }
}

export interface ShapeInterface{
  name: string;
  object: fabric.Group;
  text: string;
  connectingNodes: Array<ShapeInterface>;

}