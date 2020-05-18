import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocketIoModule, SocketIoConfig, Socket } from 'ngx-socket-io';
import { SharingService } from './service/sharing.service';
import { InputComponent } from './input/input.component';
import { Routes, Router, RouterModule } from '@angular/router';
import { DrawingComponent } from './drawing/drawing.component';

const config : SocketIoConfig = { url: "http://localhost:3000", options: {}};

const routes : Routes = [
  {path: "", component: InputComponent },
  {path: "drawing", component: DrawingComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    DrawingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    RouterModule.forRoot(routes)
  ],
  providers: [SharingService],
  bootstrap: [AppComponent]
})
export class AppModule   { 
}
