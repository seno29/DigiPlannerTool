// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, CanDeactivate } from '@angular/router';
import { UserBoardComponent } from '../user-board.component';

@Injectable()
export class UserBoardGuardService implements CanDeactivate<boolean> {
  constructor(public router: Router, private userBoardComponent: UserBoardComponent) {}
  canDeactivate(): boolean {
    if (this.userBoardComponent.isUserEditing) {
    //   this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}