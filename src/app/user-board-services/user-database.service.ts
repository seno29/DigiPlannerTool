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
    this.http.put(`http://localhost:4200/drawingUserView/${this.constants.roomID}`,
      {canvas_json: JSON.stringify(canvasJSON)}, {responseType: 'text'})
      .subscribe( responseData => {
        console.log('added');
    });
   }

  getRoomData(): Observable<RoomData> {
    return this.http.get(`${this.constants.URI}/drawingUserView/${this.constants.roomID}`) as Observable<RoomData>;
  }
}

interface RoomData{
  room_title: string;
  admin_id: string;
  canvas_json: string;
  base64: string;
}
