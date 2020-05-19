import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css'],
})
export class AdminBoardComponent implements OnInit {
  canvas: fabric.Canvas;

  colors = [
    'red',
    'blue',
    'green',
    'yellow',
    'orange',
    'brown',
    'pink',
    'violet',
  ];
  aspectRatio = 16 / 9;
  height;
  width;
  counter1;
  jsonArray = [];
  selectedColor: string;

  constructor() {
    this.selectedColor = 'red';
  }

  ngOnInit(): void {
    this.canvas = new fabric.Canvas('canvas-container', {
      backgroundColor: 'white',
      isDrawingMode: false,
    });

    this.counter1 = 0;
    this.width = window.innerWidth * 0.7;
    this.height = this.width / this.aspectRatio;
    this.canvas.setHeight(this.height);
    this.canvas.setWidth(this.width);
  }

  togglePen() {
    this.canvas.isDrawingMode = !this.canvas.isDrawingMode;
  }

  reset() {
    if (confirm('Are you sure you want to reset canvas?')) {
      this.canvas.clear();
      this.counter1 = this.jsonArray.length-1;
    }
  }

  circle() {
    this.canvas.add(
      new fabric.Circle({
        radius: 50,
        fill: this.selectedColor,
        left: 10,
        top: 10,
        opacity: 0.8,
      })
    );
  }

  box() {
    this.canvas.add(
      new fabric.Rect({
        width: 100,
        height: 100,
        fill: this.selectedColor,
        opacity: 0.8,
        left: 10,
        top: 10,
      })
    );
  }

  triangle() {
    this.canvas.add(
      new fabric.Triangle({
        width: 80,
        height: 80,
        fill: this.selectedColor,
        left: 10,
        top: 10,
      })
    );
  }

  textBox() {
    this.canvas.add(
      new fabric.Textbox('MyText', {
        width: 150,
        top: 5,
        left: 5,
        stroke: this.selectedColor,
        fontSize: 20,
        fontFamily: 'Quicksand',
        textAlign: 'center',
        // fixedWidth: 150,
      })
    );
  }

  deleteObjects() {
    var activeObject = this.canvas.getActiveObjects();
    console.log(activeObject);
    if (activeObject) {
      if (confirm('Are you sure to delete selection?')) {
        activeObject.forEach((object) => {
          this.canvas.remove(object);
        });
        this.canvas.discardActiveObject();
      }
    }
  }

  save() {
    this.jsonArray.push(JSON.stringify(this.canvas));
    this.counter1 = this.jsonArray.length-1;
  }

  undo() {
    if (this.counter1 >= 0) {
      this.canvas.loadFromJSON(
        this.jsonArray[this.counter1],
        this.counter1--,
        this.canvas.renderAll.bind(this.canvas)
      );
    }
    else{
      return;
    }
  }

  redo() {
    if(this.counter1<this.jsonArray.length){
      this.canvas.loadFromJSON(
        this.jsonArray[this.counter1],
        this.counter1++,
        this.canvas.renderAll.bind(this.canvas)
      );
    }
    else{
      return;
    }
  }

}
