import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { URI } from './constants';
@Injectable({
  providedIn: 'root'
})
export class UserDatabaseService {
  roomData: Observable<string> ;
  constructor(private http: HttpClient) { }

  getRoomData(code: string): Observable<string> {
   return this.roomData = this.http.get( `${URI}/drawing/${code}`) as Observable<string>;
  }
}
