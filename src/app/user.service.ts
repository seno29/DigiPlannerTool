import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { URI } from './constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) { }

  getUserType(email:string){
    return this.http.get(`${URI}/users/${email}`);
  }
}
