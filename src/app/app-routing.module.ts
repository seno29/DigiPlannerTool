import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserBoardComponent } from './user-board/user-board.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { ViewBoardsComponent } from './view-boards/view-boards.component';
import { UserBoardGuardService } from './user-board/guards/user-board.guard';

const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path:'home', component: HomeComponent },
  { path:'userboard', component: UserBoardComponent, canDeactivate: [UserBoardGuardService] },
  { path:'adminboard', component: AdminBoardComponent },
  { path:'viewboard' ,component: ViewBoardsComponent},
  { path: '', redirectTo:'/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }