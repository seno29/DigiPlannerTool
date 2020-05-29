import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

interface canvasData{
  canvas_json:string;
  base64:string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminBoardService {

  roomCode:string;
  base64:string;
  boardTitle:string;
  canvas_json:string;

  constructor(private http:HttpClient) { }

  sendingData(base64,jsonString,roomCode,boardTitle){

    this.roomCode = roomCode;
    this.base64 = base64;
    this.boardTitle = boardTitle;
    this.canvas_json = jsonString;

    const post : canvasData={
      base64 : this.base64,
      canvas_json : this.canvas_json
    };

    this.http.put('http://localhost:4200/drawing/'+roomCode,post,{responseType:'text'})
          .subscribe(responseData=>{
              alert(responseData+' No errors Data sent successfully');
          });
  }
}

