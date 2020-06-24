// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, CanDeactivate } from '@angular/router';
import { ICanComponentDeactivate } from '../user-board.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserBoardGuardService implements CanDeactivate<ICanComponentDeactivate> {
  constructor(public router: Router) {}
  canDeactivate(currentComponent: ICanComponentDeactivate): Observable<boolean> | boolean  {
    return currentComponent.canDeactivate ? currentComponent.canDeactivate() : true;
  }
}
