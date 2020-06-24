import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConstantsService } from './constants.service';
@Injectable({
  providedIn: 'root'
})
export class UserDatabaseService {

  constructor(private http: HttpClient, private constants: ConstantsService) { }

  sendingCanvas(canvasJSON: any){
    delete canvasJSON.backgroundImage;
    this.http.put(`http://localhost:8080/board/${this.constants.userID}/${this.constants.roomID}`,
      {canvas_json: JSON.stringify(canvasJSON)}, {responseType: 'json'})
      .subscribe( responseData => {});
   }

  getRoomData(): Observable<RoomData> {
    return this.http.get(`${this.constants.URI}/board/${this.constants.userID}/${this.constants.roomID}`) as Observable<RoomData>;
  }
}

interface RoomData{
  success: string;
  data: { room_data: {
    canvas_json: string,
    base64: string,
    room_title: string,
  }
};
}
