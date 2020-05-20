import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserBoardComponent } from './user-board/user-board.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';

const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path:'home', component: HomeComponent },
  { path:'userboard', component: UserBoardComponent },
  { path:'adminboard', component: AdminBoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }