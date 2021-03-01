import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { io, Manager } from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { map } from 'rxjs/operators';

export interface Message{
  message: string,
  sent_at: string,
  sender_type: string
}

export interface Session{
  id: string,
  last_message: Message,
  started_at: string,
  updated_at: string,
  user_name: string
}

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  private socket;
  messages: Rx.Subject<any>;
  sessions: Rx.Subject<any>;

  constructor(private httpClient: HttpClient) { }

  connect(apiToken): Rx.Subject<MessageEvent> {
    const manager = new Manager(Constants.API_ENDPOINT, {
      reconnectionDelayMax: 10000,
      query: {
        api_token: apiToken
      }
    });
    this.socket = manager.socket("/admin");

    let observable = new Observable(observer => {
      this.socket.on('sessions', conversations => {
        let conv = conversations.map(c => {
          if(!c.last_message) {
            c.last_message = {
              message: '',
              sent_at: '',
              sender_type: ''
            }
          }
          return c;
        });
        observer.next(conv);
      });
      return () => {
        this.socket.disconnect();
      }
    });

    let observer = {
      next: (data: Object) => {
        if(data) {
          this.socket.emit('sessions', data);
        } else {
          this.socket.emit('sessions');
        }

      }
    }

    return Rx.Subject.create(observer, observable);
  }

  setupSocketConnection(apiToken) {
    this.sessions = <Rx.Subject<any>>this
      .connect(apiToken)
      .pipe(
        map((response: any): any => {
          return response;
        })
      );
  }

  getSessions(key_id?: any) {
    if(key_id) {
      this.sessions.next(key_id);
    } else {
      this.sessions.next();
    }

  }

  sendMsg(payload) {
    this.socket.emit('getmessages',payload);
  }

  onNewMessage() {
    let _this = this;
    return Observable.create(observer => {
      _this.socket.on('getmessages', messages => {
        observer.next(messages);
      });
    });
  }

  switchMode(type) {
    this.socket.emit('switch', type);
  }
}
