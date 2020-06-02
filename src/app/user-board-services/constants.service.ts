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
  public userID: string;
  public roomID: string;


  constructor() {
    this.HideControls = { tl: true, tr: false, bl: true, br: true, ml: true, mt: true, mr: true, mb: true, mtr: true };
    this.userBackURL = '../../assets/user_back.png';
    this.PORT = '8080';
    this.URI = `http://0.0.0.0:${this.PORT}`;
    this.starIconURL = '../assets/stars-black-48dp.svg';
    this.colors = ['CornflowerBlue', 'darkcyan', 'MediumAquaMarine', 'lemonchiffon', 'gold', 'silver', 'salmon', 'palevioletred', 'pink'];
    this.connectText = 'Connect';
    this.disconnectText = 'Exit Connection Mode';
   }
}
