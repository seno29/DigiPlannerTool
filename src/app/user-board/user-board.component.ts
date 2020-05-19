import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { ShapeService } from '../user-board-services/shape.service';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css']
})

export class UserBoardComponent implements OnInit {
  shapesList: Array<ShapeInterFace> = [];
  colors = ['red', 'blue', 'green', 'yellow', 'orange'];
  background= 'white';
  selectedColor: string;
  canvas: fabric.Canvas;
  canvasAspectRatio = 16 / 9;
  counter1 ;
  counter2 ;
  jsonArray = [];
  connectPressed: boolean;

  constructor(private shapeService: ShapeService) {
    this.selectedColor = 'red';
    this.connectPressed = false;
  }

  ngOnInit(): void {
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.padding = 5;
    this.canvas = new fabric.Canvas('canvas-container', {isDrawingMode: false});
    this.scaleCanvas();
    this.counter1 = 0;
    this.counter2 = 0;
  }

  scaleCanvas(){
    const width = window.innerWidth * 0.7 - 10;
    const height = width / this.canvasAspectRatio;
    // console.log(width + ' hello ' + height);
    this.canvas.setHeight(height);
    this.canvas.setWidth(width);
  }
}
  /*addCircle() {
   this.shapeService.addCircle(this.canvas, this.selectedColor);
   
  }*/

  addEllipse(){
    this.shapeService.addEllipse(this.canvas,this.selectedColor);
  }

  addRectangle() {
    this.shapeService.addRectangle(this.canvas,this.selectedColor);
     }

  addImage (){
    this.shapeService.addImage(this.canvas);
  }

  clear() {
    if (confirm('Do you want to clear')) {
      this.canvas.clear();
      this.canvas.backgroundColor = this.background ;
      scaleCanvas();
      this.counter1 = this.jsonArray.length;
      this.counter2 = this.counter1;
    }
  }


  }

  export interface ShapeInterFace{
   // name : string;
    color: string;
    
  }
  