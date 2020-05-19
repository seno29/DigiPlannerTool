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
     this.canvas.setHeight(this.yDim);
      this.canvas.setWidth(this.xDim);
      this.counter1 = this.jsonArray.length;
      this.counter2 = this.counter1;
    }
  }


  }

  export interface ShapeInterFace{
   // name : string;
    color: string;
    
  }
  


