import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../authorization.service';
import { Session, SessionsService } from './sessions.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

  isMessageView: boolean = false;
  conversations: Array<Session> = [];
  token: string;
  chatList: Array<object> = [];
  adminMsg: string = '';
  selectedSession: Session = {
    user_name: '',
    id: '',
    last_message: {message: '',sent_at: '',sender_type: ''},
    started_at: '',
    updated_at: ''
  };
  isEnableAdmin: boolean = false;

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
    private authorizationService: AuthorizationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authorizationService.user.subscribe(user => {
      if(user && user.token) {
        this.token = user.token;
        this.getSessions();
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  getSessions(event?: Session) {
    let _this = this;
    this.chatList = [];
    let sessionReq: any = {};
    this.sessionsService.setupSocketConnection(this.token);
    if(event && event.id) {
      sessionReq.session_id = event.id;
    }
    this.sessionsService.getSessions(sessionReq);
    this.sessionsService.sessions.subscribe(sessions => {
      if(sessions && sessions.length) {
        _this.conversations.push(...sessions);
      }
    });
  }

  getSession(session: Session) {
    let _this = this;
    this.sessionsService.sendMsg({
      session_id: session.id
    });
    _this.chatList = [];
    this.sessionsService.onNewMessage().subscribe(messages => {
      _this.selectedSession = session;
      _this.chatList.push(...messages);
    });
  }

  sendMessage(event) {
    let _this = this;
    event.preventDefault();
    if(this.adminMsg && this.adminMsg.length) {

    }
  }

  enableAdmin(selectedSession, type) {
    this.sessionsService.switchMode(type);
  }

  calculateClasses(ch) {
    return {
        'vf-msg-card-left': ch.sender_type == 'User',
        'vf-msg-card-right': ch.sender_type != 'User',
        'admin-card': ch.sender_type == 'Admin'
    };
  }

  getMatListClasses(id) {
    return {
      'mat-list-single-selected-option': id === this.selectedSession.id
    }
  }

}
