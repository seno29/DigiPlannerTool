import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { ShapeService } from '../user-board-services/shape.service';
import { ScalingService } from '../user-board-services/scaling.service';

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
  canvasAspectRatio = 16 / 9;
  counter1 ;
  counter2 ;
  jsonArray = [];
  
  constructor(private shapeService: ShapeService, private scaleService: ScalingService) {
    this.selectedColor = 'red';
    this.shapesArray = [];
  }

  ngOnInit(): void {
    fabric.Object.prototype.transparentCorners = false;
    this.canvas = new fabric.Canvas('canvas-container', {
      hoverCursor: 'pointer',
      selection: true
    });
    this.scaleCanvas();
    // this.scaleService.assignEventListenersCanvas(this.canvas);
    this.counter1 = 0;
    this.counter2 = 0;
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
      this.counter1 = this.jsonArray.length;
      this.counter2 = this.counter1;
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
