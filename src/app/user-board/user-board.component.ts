import { Component, OnInit } from '@angular/core';
import {fabric } from 'fabric';
import { ShapeService} from '../services/shape.service';
//import { FabricObjectType } from '../model';
@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css']
})
export class UserBoardComponent implements OnInit {
  canvas : fabric.Canvas;
  counter1 ;
  counter2 ;
  jsonArray = [];
  //selectedColor = 'Thistle';
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
    this.canvas.add(
      new fabric.Rect({
        width: 100,
        height: 100,
        fill: 'selectedColor',
        opacity: 0.5,
        left: 10,
        top: 10,
      })
    );
  }

  clear() {
    if (confirm('Do you want to clear')) {
      this.canvas.clear();
      this.canvas.backgroundColor = this.background ;
     this.canvas.setHeight(this.yDim);
      this.canvas.setWidth(this.xDim);
      this.counter1 = this.jsonArray.length;
      this.counter2 = this.counter1;
    }
  }
  }


