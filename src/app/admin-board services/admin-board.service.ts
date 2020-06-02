import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

interface canvasData{
  base64:string;
  is_published:string
}

@Injectable({
  providedIn: 'root'
})
export class AdminBoardService {

  base64:string;

  constructor(private http:HttpClient) { }

  sendingData(base64,roomCode,userId){

    this.base64 = base64;

    const post : canvasData={
      base64 : this.base64,
      is_published : 'true'
    };

    return this.http.put(`http://localhost:4200/board/${userId}/${roomCode}` , post , {responseType:'json'});

  }
}
