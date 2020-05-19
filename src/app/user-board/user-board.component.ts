import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { ShapeService } from '../user-board-services/shape.service';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css']
})
export class UserBoardComponent implements OnInit {
  colors = ['red', 'blue', 'green', 'yellow', 'orange'];
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

  circle() {
    this.canvas.add(
      new fabric.Circle({
        radius: 50,
        fill: 'selectedColor',
        left: 10,
        top: 10,
        opacity: 0.5,
      })
    );
  }

  rectangle() {
    this.shapeService.addRectangle(this.canvas, this.selectedColor);
  }

  scaleCanvas(){
    const width = window.innerWidth * 0.7 - 10;
    const height = width / this.canvasAspectRatio;
    // console.log(width + ' hello ' + height);
    this.canvas.setHeight(height);
    this.canvas.setWidth(width);
  }
}
