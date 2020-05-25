import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css'],
})
export class AdminBoardComponent implements OnInit {
  canvas: fabric.Canvas;


  colors = ['cornsilk', 'CornflowerBlue', 'aquamarine', 'thistle', 'salmon','pink','red','blue','lime'];

  height;
  width;
  selectedColor: string;

  constructor() {}

  ngOnInit(): void {
    this.canvas = new fabric.Canvas('canvas', {
      backgroundColor: 'white',
      isDrawingMode: false,
    });

    this.canvas.setHeight(650);
    this.canvas.setWidth(1190);
    this.selectedColor = 'cornsilk';
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

  exportJsonAdmin(){
    const url = this.canvas.toDataURL();
  }
}
