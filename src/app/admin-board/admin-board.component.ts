import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css'],
})
export class AdminBoardComponent implements OnInit {
  canvas: fabric.Canvas;

  colors = ['red', 'blue', 'green', 'yellow', 'orange','brown','pink','violet'];
  aspectRatio = 16 / 9;
  height;
  width;
  counter1 ;
  counter2 ;
  jsonArray = [];
  selectedColor:string ;

  constructor() {
    this.selectedColor='red';
  }

  ngOnInit(): void {
    this.canvas = new fabric.Canvas('canvas-container', {
      backgroundColor: "white",
      isDrawingMode: false,
    });

    this.counter1 = 0;
    this.counter2 = 0;
    this.width = window.innerWidth * 0.70;
    this.height = this.width / this.aspectRatio;
    this.canvas.setHeight(this.height);
    this.canvas.setWidth(this.width);
  }

  togglePen() {
    this.canvas.isDrawingMode = !this.canvas.isDrawingMode;
  }

  reset() {
    if (confirm('Are you sure?')) {
      this.canvas.clear();
      this.counter1 = this.jsonArray.length;
      this.counter2 = this.counter1;
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
        stroke:this.selectedColor,
        fontSize: 16,
        textAlign: 'center',
        fixedWidth: 150,
      })
    );
  }

  deleteObjects() {
    var activeObject = this.canvas.getActiveObjects();
    console.log(activeObject);
    if (activeObject) {
      if (confirm('Are you sure?')) {
        activeObject.forEach((object) => {
          this.canvas.remove(object);
        });
        this.canvas.discardActiveObject();
      }
    }
  }

  canvasToJson() {
    this.jsonArray.push(JSON.stringify(this.canvas));
    this.counter1 = this.jsonArray.length;
    this.counter2 = this.counter1;
    console.log(JSON.stringify(this.canvas))
  }

  loadJson() {
    var x = this.counter2;
    this.counter2--;
    this.finalLoadScreen(x-1);
  }

  finalLoadScreen(pos){
    this.canvas.loadFromJSON(
      this.jsonArray[pos],
      this.canvas.renderAll.bind(this.canvas)
      // function (o, object) {
      //   fabric.log(o, object);
      // }
    );
  }
}
