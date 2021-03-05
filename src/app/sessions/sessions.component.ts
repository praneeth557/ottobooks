import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthorizationService } from '../authorization.service';
import { Session, SessionsService } from './sessions.service';
import * as _ from 'lodash';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit, OnDestroy {

  isMessageView: boolean = false;
  conversations = new BehaviorSubject([]);
  token: string;
  chatList = new BehaviorSubject([]);
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

  sessionsSpinner: boolean = false;
  messagesSpinner: boolean = false;

  private sessionBatch:number = 0;

  private destroyAuthSubscribe: Subscription;
  private destroySessionSubscribe: Subscription;
  private destroyGetMessagesSubscribe: Subscription;
  private destroySendMessageSubscribe: Subscription;

  // @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild('scrollMe')
  public virtualScrollViewport?: CdkVirtualScrollViewport;

  ngAfterViewChecked() {
      this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
        //this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  constructor(
    private sessionsService: SessionsService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.destroyAuthSubscribe = this.authorizationService.user.subscribe(user => {
      if(user && user.token) {
        this.token = user.token;
        this.getSessions();
        this.onObservables();
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  getSessions(event?: Session) {
    let _this = this;
    let sessionReq: any = {};
    this.sessionsService.setupSocketConnection(this.token);
    if(event && event.id) {
      sessionReq.key_id = event.id;
    }
    this.sessionsSpinner = true;
    this.sessionsService.getSessions(sessionReq);
  }

  onObservables() {
    let _this = this;

    this.destroySessionSubscribe = this.sessionsService.sessions.subscribe(sessions => {
      this.sessionsSpinner = false;
      if(sessions && sessions.length) {
        const time = new Date();
        console.info("SESSIONS : " + time);
        console.info(sessions);
        let currentSessions = this.conversations.getValue();
        this.conversations.next(_.concat(currentSessions, sessions));
      }
    });


    this.destroyGetMessagesSubscribe = this.sessionsService.messages.subscribe(messages => {
      this.messagesSpinner = false;
      const time = new Date();
      console.info("MESSAGES : " + time);
      console.info(messages);
      _this.chatList.next(_.concat(_this.chatList.getValue(), messages));
    });


    this.destroySendMessageSubscribe = this.sessionsService.message.subscribe(message => {
      const time = new Date();
      console.info("NEW MESSAGE : " + time);
      console.info(message);
      _this.chatList.next(_.concat(_this.chatList.getValue(), [message]));
    });
  }

  getSession(session: Session) {
    let _this = this;
    this.messagesSpinner = true;
    this.sessionsService.getMessages({
      session_id: session.id
    });
    _this.selectedSession = session;
    _this.isEnableAdmin = session.mode == 'admin' ? true : false;
    _this.chatList = new BehaviorSubject([]);
    //this.virtualScrollViewport.scrollToIndex(12);
    // setTimeout(() => {
    //   const items = document.getElementsByClassName("mat-list-item");
    //   items[items.length - 1].scrollIntoView();
    // }, 10);
  }

  sendMessage(event) {
    let _this = this;
    event.preventDefault();
    if(this.adminMsg && this.adminMsg.length) {
      this.sessionsService.sendMessage({session_id: this.selectedSession.session_id, message: this.adminMsg});
      let newMsg = {message: this.adminMsg, sent_at: '', sender_type: 'Admin'};
      _this.chatList.next(_.concat(_this.chatList.getValue(), [newMsg]));
      this.adminMsg = '';
    }
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

  onSessionsScrolled(event) {
    if(event && event/15 === this.sessionBatch+1) {
      const len = this.conversations.getValue().length;
      const lastSession = this.conversations.getValue()[len-1];
      console.log("Sessions scrolled!");
      console.log(event);
      console.log(lastSession);
      let sessionReq: any = {};
      if(lastSession && lastSession.id) {
        sessionReq.key_id = lastSession.id;
      }
      this.sessionsSpinner = true;
      this.sessionsService.getSessions(sessionReq);
      this.sessionBatch ++;
    }
  }

  onMessagesScrolled(event) {
    console.log(event);
  }

  ngOnDestroy() {
    this.sessionsService.disconnectSocket();
    this.destroyAuthSubscribe.unsubscribe();
    this.destroySessionSubscribe.unsubscribe();
    this.destroyGetMessagesSubscribe.unsubscribe();
    this.destroySendMessageSubscribe.unsubscribe();
  }

}
