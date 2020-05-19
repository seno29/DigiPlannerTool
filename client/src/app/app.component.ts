import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client-app';
  current = {
    color: 'black',
  };

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.sendMessage('Hi i am shubham');
    this.socketService.msg.subscribe((msg) => {
      console.log(msg);
    });
  }
}
