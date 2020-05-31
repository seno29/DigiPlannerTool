import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { AdminBoardService } from '../admin-board services/admin-board.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css'],
})
export class AdminBoardComponent implements OnInit {
  canvas: fabric.Canvas;
  title = 'adminboard';
  convertedCanvas;

  colors = [
    'aqua',
    'BlueViolet',
    'orange',
    'magenta',
    'red',
    'blue',
    'lime',
  ];

  selectedColor: string;
  roomCode: string;
  boardTitle: string;
  jsonString: string = '';

  constructor(
    private route: ActivatedRoute,
    private adminBoardService: AdminBoardService,
    private location:Location,
    private snackBar:MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.canvas = new fabric.Canvas('canvas', {
      backgroundColor: 'white',
      isDrawingMode: false,
    });

    this.canvas.setHeight(650);
    this.canvas.setWidth(1190);
    this.selectedColor = 'aqua';

    this.route.queryParams.subscribe((params) => {
      this.roomCode = params['roomCode'];
      this.boardTitle = params['boardTitle'];
    });

    //AdminSocketService can be used here for multiple admins
  }

  exportJsonAdmin() {
    this.convertedCanvas = this.canvas.toDataURL();
    this.adminBoardService.sendingData(this.convertedCanvas, this.roomCode)
      .subscribe(responseData=>{
        this.showSnackBar('Canvas saved successfully ', responseData);
      });

    this.location.back();
  }

  showSnackBar(message:string,action:string):void {
    this.snackBar.open(message,action,{
      duration:3000
    });
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
        scaleY: scale
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
        scaleY: scale
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
        top: 10
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
        top: 10
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
        fontFamily: 'Verdana',
        textAlign: 'center'
      })
    );
  }

  changeColor(color) {
    this.selectedColor = color;
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
