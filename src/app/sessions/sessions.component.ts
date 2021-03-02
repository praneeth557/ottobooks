import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../authorization.service';
import { Session, SessionsService } from './sessions.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit, OnDestroy {

  isMessageView: boolean = false;
  conversations: Array<Session> = [];
  token: string;
  chatList: Array<object> = [];
  adminMsg: string = '';
  selectedSession: Session = {
    user_name: '',
    id: '',
    session_id: '',
    last_message: {message: '',sent_at: '',sender_type: ''},
    started_at: '',
    updated_at: '',
    mode: ''
  };
  isEnableAdmin: boolean = false;
  sessionsBatch = 0;

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
    this.sessionsService.getMessages({
      session_id: session.id
    });
    _this.chatList = [];
    this.sessionsService.onGetMessages().subscribe(messages => {
      _this.selectedSession = session;
      _this.chatList.push(...messages);
      this.isEnableAdmin = session.mode == 'admin' ? true : false;
    });
  }

  sendMessage(event) {
    let _this = this;
    event.preventDefault();
    if(this.adminMsg && this.adminMsg.length) {
      this.sessionsService.sendMessage({session_id: this.selectedSession.session_id, message: this.adminMsg});
      _this.chatList.push({message: this.adminMsg, sent_at: '', sender_type: 'Admin'});
      this.adminMsg = '';
    }
    this.sessionsService.onNewMessage().subscribe(message => {
      console.log(message);
      _this.chatList.push(message);
    });
  }

  enableAdmin(selectedSession, mode) {
    this.sessionsService.switchMode({session_id: this.selectedSession.session_id, mode: mode});
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

  onSessionsScrolled() {
    const len = this.conversations.length;
    const lastSession = this.conversations[len-1];
    console.log(lastSession);
    this.getSessions(lastSession);
  }

  ngOnDestroy() {
    this.sessionsService.disconnectSocket();
  }

}
