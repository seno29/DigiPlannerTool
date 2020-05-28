import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import {AdminBoardService} from '../admin-board services/admin-board.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css'],
})
export class AdminBoardComponent implements OnInit {
  canvas: fabric.Canvas;
  title = 'adminboard';
  convertedCanvas;

  colors = ['cornsilk', 'CornflowerBlue', 'aquamarine', 'thistle', 'salmon','pink','red','blue','lime'];

  selectedColor: string ;
  roomCode: string;
  boardTitle: string;
  jsonString: string = '';

  constructor(private route:ActivatedRoute,private adminBoardService:AdminBoardService) {}

  ngOnInit(): void {
    this.canvas = new fabric.Canvas('canvas', {
      backgroundColor: 'white',
      isDrawingMode: false,
    });

    this.canvas.setHeight(650);
    this.canvas.setWidth(1190);
    this.selectedColor = 'cornsilk';

    this.route.queryParams.subscribe(params => {
      this.roomCode=params['roomCode'];
      this.boardTitle=params['boardTitle'];
    });
  }

  exportJsonAdmin(){
    this.convertedCanvas = this.canvas.toDataURL();
    this.adminBoardService.sendingData(this.convertedCanvas,this.jsonString,this.roomCode,this.boardTitle);
  }

  togglePen() {
    this.canvas.isDrawingMode = !this.canvas.isDrawingMode;
  }

  dialog() {
    fabric.Image.fromURL('../assets/images/dialog.jpg', (img) => {
      const scale = 150 / img.width;
      img.set({
        transparentCorners: false,
        top: 10,
        left: 10,
        scaleX: scale,
        scaleY: scale,
        opacity : 0.7
      });
      this.canvas.add(img);
    });
    this.canvas.isDrawingMode = false;
  }

  cloud() {
    fabric.Image.fromURL('../assets/images/cloud.png', (img) => {
      const scale = 150 / img.width;
      img.set({
        top: 10,
        left: 10,
        scaleX: scale,
        scaleY: scale,
        opacity : 0.7
      });
      this.canvas.add(img);
    });
    this.canvas.isDrawingMode = false;
  }

  reset() {
    if (confirm('Are you sure you want to reset canvas?')) {
      this.canvas.clear();
      this.canvas.isDrawingMode = false;
    }
  }

  circle() {
    this.canvas.isDrawingMode = false;
    this.canvas.add(
      new fabric.Circle({
        radius: 50,
        fill: this.selectedColor,
        left: 10,
        top: 10,
        opacity: 0.7,
      })
    );
  }

  box() {
    this.canvas.isDrawingMode = false;
    this.canvas.add(
      new fabric.Rect({
        width: 100,
        height: 100,
        fill: this.selectedColor,
        opacity: 0.7,
        left: 10,
        top: 10,
      })
    );
  }

  triangle() {
    this.canvas.isDrawingMode = false;
    this.canvas.add(
      new fabric.Triangle({
        width: 80,
        height: 80,
        fill: this.selectedColor,
        left: 10,
        top: 10,
        opacity : 0.7
      })
    );
  }

  textBox() {
    this.canvas.isDrawingMode = false;
    this.canvas.add(
      new fabric.Textbox('MyText', {
        width: 150,
        top: 5,
        left: 5,
        stroke: this.selectedColor,
        fontSize: 20,
        fontFamily: 'Quicksand',
        textAlign: 'center',
        opacity : 0.7
      })
    );
  }

  changeColor(color){
    this.selectedColor=color;
  }

  deleteObjects() {
    this.canvas.isDrawingMode = false;
    var activeObject = this.canvas.getActiveObjects();
    if (activeObject) {
      if (confirm('Are you sure to delete selection?')) {
        activeObject.forEach((object) => {
          this.canvas.remove(object);
        });
      }
      this.canvas.discardActiveObject();
    }
  }
}
