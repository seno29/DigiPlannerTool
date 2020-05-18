import { Component, OnInit } from '@angular/core';
import { SharingService } from './service/sharing.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 
  title = 'socket';
  constructor(private ser: SharingService){
  }
  ngOnInit(){
    this.ser.sendMessage("hi started");
  }
}
