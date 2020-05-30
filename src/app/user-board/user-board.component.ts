import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { fabric } from 'fabric';
import { ActivatedRoute } from '@angular/router';
import { ShapeService } from '../user-board-services/shape.service';
import { ConstantsService } from '../user-board-services/constants.service';
import { SocketService } from '../socket-services/socket.service';
import { UserSocketService } from '../socket-services/user-socket.service';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css'],
})
export class UserBoardComponent implements OnInit, OnDestroy {
  canvas: fabric.Canvas;
  boardTitle: string;

  constructor(
    private shapeService: ShapeService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    public constants: ConstantsService,
    private socketService: SocketService,
    private userSocketService: UserSocketService,
  ) { }

  ngOnInit(): void {
    this.socketService.socket.connect();
    this.constants.roomID = this.route.snapshot.queryParamMap.get('room_code') || 'unknown';
    this.canvas = this.shapeService.initCanvas(this.constants.roomID);
    this.userSocketService.init(this.canvas, this.renderer, this.constants.roomID);
  }

  ngOnDestroy(): void {
    this.socketService.socket.disconnect();
  }

  addObj(shape) {
    this.socketService.somethingAdded(
      shape,
      this.canvas.selectedColor,
      this.constants.roomID
    );
  }

  addEllipse() {
    this.shapeService.addEllipse(this.canvas, this.renderer);
    this.addObj('ellipse');
  }

  addRectangle() {
    this.shapeService.addRectangle(this.canvas, this.renderer);
    this.addObj('rect');
  }

  addImage() {
    this.shapeService.addImage(this.canvas, '', this.renderer);
    this.addObj('image');
  }

  clear() {
    if (confirm('Do you want to clear?')) {
      this.canvas.clear();
      this.shapeService.setBackground(this.canvas, 'assets');
      this.socketService.clearCanvas(this.canvas, this.constants.roomID);
      document.getElementById('deleteBtn')?.remove();
    }
  }

  connect() {
    if (this.canvas.connect) {
      this.canvas.connect = false;
      this.canvas.connectButtonText = this.constants.disconnectText;
    } else {
      while (this.canvas.selectedElements.length > 0) {
        this.canvas.selectedElements.pop();
      }
      this.canvas.connect = true;
      this.canvas.connectButtonText = this.constants.disconnectText;
    }
  }

  exportAsImage(canvasContent) {
    let image = canvasContent
      .toDataURL('image/jpg', 1.0)
      .replace('image/jpg', 'image/octet-stream');
    let link = document.createElement('a');
    link.download = 'board-image.jpg';
    link.href = image;
    link.click();
  }

  changeColor(color: string) {
    this.shapeService.changeColor(this.canvas, color, this.renderer);
  }
}
