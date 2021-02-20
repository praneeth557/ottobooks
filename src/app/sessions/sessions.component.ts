import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Session, SessionsService } from './sessions.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

  conversations: Array<Session> = [];
  token: string;
  chatList: Array<object> = [];

  constructor(
    private sessionsService: SessionsService,
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.sessionsService.getConversations().subscribe((conversations: Array<Session>) => {
      this.conversations = conversations;
      this.authorizationService.user.subscribe(user => {
        if(user && user.token) this.token = user.token;
        if(this.conversations && this.conversations.length) {
          let selectedSession: string = this.conversations[0].id;
          this.getSession(selectedSession);
        }
      });
    });
  }

  getSession(id: string) {
    this.sessionsService.setupSocketConnection(this.token, id);
    let _this = this;
    this.sessionsService.onNewMessage().subscribe(msg => {
      _this.chatList.push(msg);
      console.log(msg);
    });
  }

}
