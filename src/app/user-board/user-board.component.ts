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
  canvasAspectRatio = 16 / 9;

  constructor(private shapeService: ShapeService, private scalingService: ScalingService) {
    this.selectedColor = 'cornsilk';
  }

  ngOnInit(): void {
    this.canvas = this.shapeService.initCanvas();
  }

  scaleCanvas(){
    this.scalingService.scaleBoard(this.canvas, 16 / 9);
  }

  addEllipse(){
    this.shapeService.addEllipse(this.canvas, this.selectedColor);
    // console.log(this.canvas.getObjects());
  }

  addRectangle() {
    this.shapeService.addRectangle(this.canvas, this.selectedColor);
  }

  addImage(){
    this.shapeService.addImage(this.canvas, '');
  }

  clear() {
    if (confirm('Do you want to clear')) {
      this.canvas.clear();
      this.scaleCanvas();
      this.canvas.deleteMode = false;
      this.canvas.deleteText = 'Delete';
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

  delete(){
    if (this.canvas.deleteMode){
      this.canvas.deleteMode = false;
      this.canvas.deleteText = 'Delete';
    }
    else{
      this.canvas.deleteMode = true;
      this.canvas.deleteText = 'Exit Delete Mode';
    }
  }
}
