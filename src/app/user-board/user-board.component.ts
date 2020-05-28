import { Component, OnInit, Renderer2 } from '@angular/core';
import { fabric } from 'fabric';
import { ActivatedRoute } from '@angular/router';
import { ShapeService } from '../user-board-services/shape.service';
import { ConstantsService } from '../user-board-services/constants.service';
@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css']
})

export class UserBoardComponent implements OnInit {
  canvas: fabric.Canvas;
  boardID: string;
  boardTitle: string;
  constructor(private shapeService: ShapeService, private renderer: Renderer2,
              private route: ActivatedRoute, public constants: ConstantsService) {
  }

  ngOnInit(): void {
    this.boardID = this.route.snapshot.queryParamMap.get('room_code') || 'unknown';
    this.canvas = this.shapeService.initCanvas(this.boardID);
  }

  addEllipse(){ this.shapeService.addEllipse(this.canvas, this.renderer); }

  addRectangle() { this.shapeService.addRectangle(this.canvas, this.renderer); }

  addImage(){ this.shapeService.addImage(this.canvas, '', this.renderer); }

  clear() {
    if (confirm('Do you want to clear?')) {
      this.canvas.clear();
      this.shapeService.setBackground(this.canvas, 'assets');
      document.getElementById('deleteBtn')?.remove();
    }
  }

  connect(){
    if (this.canvas.connect){
      this.canvas.connect = false;
      this.canvas.connectButtonText = this.constants.disconnectText;
    }
    else{
      while (this.canvas.selectedElements.length > 0 ){
        this.canvas.selectedElements.pop();
      }
      this.canvas.connect = true;
      this.canvas.connectButtonText = this.constants.disconnectText;
    }
  }

  changeColor(color: string){
    this.shapeService.changeColor(this.canvas, color, this.renderer);
  }
}
