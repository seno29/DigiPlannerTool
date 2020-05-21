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
  colors = ['cornsilk', 'cyan', 'aquamarine', 'thistle', 'salmon'];
  background = 'white';
  selectedColor: string;
  canvas: fabric.Canvas;
  shapesArray;
  canvasAspectRatio = 16 / 9;

  constructor(private shapeService: ShapeService, private scalingService: ScalingService) {
    this.selectedColor = 'cornsilk';
    this.shapesArray = [];
  }

  ngOnInit(): void {
    fabric.Object.prototype.transparentCorners = false;
    this.canvas = this.shapeService.initCanvas();
  }

  scaleCanvas(){
    this.scalingService.scaleBoard(this.canvas, 16 / 9);
  }

  addEllipse(){
    this.addToArray(this.shapeService.addEllipse(this.canvas, this.selectedColor));
  }

  addRectangle() {
    this.addToArray(this.shapeService.addRectangle(this.canvas, this.selectedColor));
  }

  addImage(){
    this.addToArray(this.shapeService.addImage(this.canvas, ''));
  }

  addToArray(group){
    group.uuid = this.shapesArray.length;
    this.shapesArray.push(group);
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
