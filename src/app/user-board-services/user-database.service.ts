import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConstantsService } from './constants.service';
@Injectable({
  providedIn: 'root'
})
export class UserDatabaseService {
  constructor(private http: HttpClient, private constants: ConstantsService) { }

  getRoomData(code: string): Observable<RoomData> {
    return this.http.get(`${this.constants.URI}/drawingUserView/${code}`) as Observable<RoomData>;
  }
}

interface RoomData{
  room_title: string;
  admin_id: string;
  canvas_json: JSON;
  base64: string;
}
