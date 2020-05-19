import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AdminBoardComponent } from './admin-board/admin-board.component';
import { UserBoardComponent } from './user-board/user-board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ShapeService } from './services/shape.service';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminBoardComponent,
    UserBoardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [ShapeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
