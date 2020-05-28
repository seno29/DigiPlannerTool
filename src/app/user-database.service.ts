import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserDatabaseService {
  private uri: string = 'http://localhost:4200';
  roomData: Observable<string> ;
  constructor(private http: HttpClient) { }

  getRoomData(code: string): Observable<string> {
   return this.roomData = this.http.get( `${this.uri}/drawing/${code}`) as Observable<string>;
  }
}
