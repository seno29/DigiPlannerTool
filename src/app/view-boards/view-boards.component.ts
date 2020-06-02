import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialUser, AuthService } from 'angularx-social-login';
import { BoardService } from '../board.service';


@Component({
  selector: 'app-view-boards',
  templateUrl: './view-boards.component.html',
  styleUrls: ['./view-boards.component.css']
})
export class ViewBoardsComponent implements OnInit {
  currentUser:SocialUser;
  boards:any;
  constructor(private router:Router,
    private authService:AuthService,
    private boardService:BoardService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.currentUser = user;
      if(!this.currentUser){
        this.router.navigate(['/login']);
      }
    });
    this.boardService.viewBoard(this.currentUser.email).subscribe((result) => {
      if(result['success']){
        let data = result['data'];
        this.boards = data.boards;
      }else{
        console.log('unable to fetch boards');
      }
    });
  }
}
