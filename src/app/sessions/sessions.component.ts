import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  adminMsg: string = '';
  selectedSession: Session = {
    user_name: '',
    id: '',
    last_message: '',
    started_at: '',
    updated_at: ''
  };

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngAfterViewChecked() {
      this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

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
          let selectedSession: Session = this.conversations[0];
          this.getSession(selectedSession);
        }
      });
    });
  }

  getSession(selectedSession: Session) {
    let _this = this;
    this.chatList = [];
    this.selectedSession = selectedSession;
    this.sessionsService.setupSocketConnection(this.token, selectedSession.id);
    this.sessionsService.onNewMessage().subscribe(msg => {
      _this.chatList.push(...msg);
      console.log(msg);
    });
  }

  sendMessage(event) {
    event.preventDefault();
    if(this.adminMsg && this.adminMsg.length) {
      this.sessionsService.sendMsg(this.adminMsg);
      this.adminMsg = '';
    }
  }

}
