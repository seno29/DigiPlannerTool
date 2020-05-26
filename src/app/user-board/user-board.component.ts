import { Component, OnInit, Renderer2 } from '@angular/core';
import { fabric } from 'fabric';
import { ActivatedRoute } from '@angular/router';

import { ShapeService } from '../user-board-services/shape.service';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css']
})

export class UserBoardComponent implements OnInit {
  colors: Array<string>;
  canvas: fabric.Canvas;
  boardID: string;
  boardTitle: string;

  constructor(private shapeService: ShapeService, private renderer: Renderer2, private route: ActivatedRoute) {
    this.colors = ['cornsilk', 'CornflowerBlue', 'aquamarine', 'thistle', 'salmon'];
  }

  ngOnInit(): void {
    this.boardID = this.route.snapshot.queryParamMap.get('roomCode');
    this.boardTitle = this.getTitleFromDatabase(this.boardID) || 'UserUI';
    this.canvas = this.shapeService.initCanvas('');
  }

  addEllipse(){ this.shapeService.addEllipse(this.canvas, this.renderer); }

  addRectangle() { this.shapeService.addRectangle(this.canvas, this.renderer); }

  addImage(){ this.shapeService.addImage(this.canvas, '', this.renderer); }

  clear() {
    if (confirm('Do you want to clear')) {
      this.canvas.clear();
      this.ngOnInit();
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
    this.shapeService.changeColor(this.canvas, color, this.renderer);
  }

  getTitleFromDatabase(roomCode: string){
    return '';
  }
}
