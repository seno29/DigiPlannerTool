import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { URI } from './constants';
import { Observable } from 'rxjs';

interface roomdata{
  room_id:string;
  room_title:string;
}

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http:HttpClient) { }
  
  isExist(room_code:string){
    return this.http.get(`${URI}/roomIdExists/${room_code}`);
  }
  
  createBoard(room_code:string,board_title:string,userId:string):Observable<string> {
    let newRoom:roomdata = {
      room_id : room_code,
      room_title : board_title
    };
   return this.http.post(`${URI}/boards/${userId}`,newRoom,{responseType:'text'});
  }

  addJoinedRoom(room_code:string,userId:string) {
    return this.http.post(`${URI}/addJoinedRoom/${userId}`,{room_id:room_code},{responseType:'text'});
  }

  viewBoard(userId:string) {
    return this.http.get(`${URI}/boards/${userId}`);
  }
}
