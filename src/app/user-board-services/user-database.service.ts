import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConstantsService } from './constants.service';
@Injectable({
  providedIn: 'root'
})
export class UserDatabaseService {
  roomCode:string;

  constructor(private http: HttpClient, private constants: ConstantsService) { }

  sendingData(canvasJSON: any){
    delete canvasJSON.backgroundImage;
     this.http.put(`http://localhost:4200/drawingUserView/${this.roomCode}`,{canvas_json:JSON.stringify(canvasJSON)},{responseType:'text'})
           .subscribe(responseData=>{
              console.log("added");
           });
   }

  getRoomData(code: string): Observable<RoomData> {
    this.roomCode=code;
    return this.http.get(`${this.constants.URI}/drawingUserView/${code}`) as Observable<RoomData>;
  }
}

interface RoomData{
  room_title: string;
  admin_id: string;
  canvas_json: string;
  base64: string;
}
