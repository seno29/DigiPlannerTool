import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { URI } from './constants';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http:HttpClient) { }
  
  isExist(userId:string,room_code:string){
    return this.http.get(`${URI}/room/${userId}/${room_code}`);
  }
  
  createBoard(room_code:string,board_title:string,userId:string){
   return this.http.post(`${URI}/board/${userId}/${room_code}`,{room_title: board_title});
  }

  addJoinedRoom(room_code:string,userId:string) {
    return this.http.post(`${URI}/room/${userId}/${room_code}`,{});
  }

  viewBoard(userId:string) {
    return this.http.get(`${URI}/user/${userId}`);
  }
}
