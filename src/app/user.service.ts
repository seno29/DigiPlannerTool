import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private uri:string = 'http://localhost:4200';
  constructor(private http:HttpClient) { }

  getUserType(email:string){
    return this.http.get(`${this.uri}/users/${email}`);
  }
}
