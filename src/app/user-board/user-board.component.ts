import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { ShapeService } from '../user-board-services/shape.service';
import { ScalingService } from '../user-board-services/scaling.service';
import { element } from 'protractor';
import { TextBoxService } from '../user-board-services/text-box.service';

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
  shapesArray;
  redoArray;
  canvasAspectRatio = 16 / 9;

  constructor(private shapeService: ShapeService, private scaleService: ScalingService, private textService:TextBoxService) {
    this.selectedColor = 'red';
    this.shapesArray = [];
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
    this.canvas.selectedElements = [];
    this.canvas.connect = false;
    this.canvas.connectButtonText = 'Connect';
  }

  scaleCanvas(){
    const width = window.innerWidth * 0.7 - 10;
    const height = width / this.canvasAspectRatio;
    // console.log(width + ' hello ' + height);
    this.canvas.setHeight(height);
    this.canvas.setWidth(width);
  }
  doUndo(){
    var data = this.shapesArray[this.shapesArray.length-1];
    this.redoArray.push(this.shapesArray.pop());
    this.canvas.remove(data);
   
  }
  
  doRedo(){
    var data=this.redoArray[this.redoArray.length-1];
    this.shapesArray.push(this.redoArray.pop());
    this.canvas.add(data);
  }
  /*doUndo() {
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
   Undo(playStack, saveStack):void {
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
  save(object:fabric.Group) {
    this.redoArray.push(JSON.stringify(object));
    this.counter1 = this.redoArray.length-1;
  
  }
 
  doUndo() {
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
   doUndo() {
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
      this.canvas.connectButtonText = 'Stop';
    }
  }
}
