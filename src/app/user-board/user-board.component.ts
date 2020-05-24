import { Component, OnInit, Renderer2 } from '@angular/core';
import { fabric } from 'fabric';

import { ShapeService } from '../user-board-services/shape.service';
import { ScalingService } from '../user-board-services/scaling.service';
import { TextBoxService } from '../user-board-services/text-box.service';


@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css']
})

export class UserBoardComponent implements OnInit {
  colors: Array<string>;
  background: string;
  selectedColor: string;
  canvas: fabric.Canvas;

  constructor(private shapeService: ShapeService, private renderer: Renderer2, private textService: TextBoxService) {
    this.selectedColor = 'cornsilk';
    this.background = 'white';
    this.colors = ['cornsilk', 'cyan', 'aquamarine', 'thistle', 'salmon'];
  }

  ngOnInit(): void {
    this.canvas = this.shapeService.initCanvas(this.renderer);
  }

  addEllipse(){ this.shapeService.addEllipse(this.canvas); }

  addRectangle() { this.shapeService.addRectangle(this.canvas); }

  addImage(){ this.shapeService.addImage(this.canvas, ''); }

  clear() {
    if (confirm('Do you want to clear')) {
      this.canvas.clear();
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

  changeColor(color: string){
    this.canvas.selectedColor = color;
    this.textService.changeColor(this.canvas, color);
  }


}
