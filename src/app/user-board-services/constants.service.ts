import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  HideControls: object;
  userBackURL: string;
  starIconURL: string;
  PORT: string;
  URI: string;
  clientId: string;
  colors: Array<string>;
  connectText: string;
  disconnectText: string;


  constructor() {
    this.HideControls = { tl: true, tr: false, bl: true, br: true, ml: true, mt: true, mr: true, mb: true, mtr: true };
    this.userBackURL = '../../assets/user_back.png';
    this.PORT = '4200';
    this.URI = `http://localhost:${this.PORT}`;
    this.clientId = '610664320073-4ik734pbbflijv056jr130n5k6e7ia8q.apps.googleusercontent.com';
    this.starIconURL = '../assets/stars-black-48dp.svg';
    this.colors = ['cornsilk', 'CornflowerBlue', 'aquamarine', 'thistle', 'salmon'];
    this.connectText = 'Connect';
    this.disconnectText = 'Exit Connection Mode';
   }
}
