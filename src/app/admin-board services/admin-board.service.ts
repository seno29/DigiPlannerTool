import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

interface canvasData{
  base64:string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminBoardService {

  roomCode:string;
  base64:string;

  constructor(private http:HttpClient) { }

  sendingData(base64,roomCode){

    this.roomCode = roomCode;
    this.base64 = base64;

    const post : canvasData={
      base64 : this.base64,
    };

    this.http.put('http://localhost:4200/drawing/'+this.roomCode,post,{responseType:'text'})
          .subscribe(responseData=>{
              alert(responseData+' No errors Data sent successfully');
          });
  }
}
