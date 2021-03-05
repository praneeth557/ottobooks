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
  session_id: string,
  last_message: Message,
  started_at: string,
  updated_at: string,
  user_name: string,
  mode: string
}

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  private socket;
  sessions: Rx.Subject<any>;
  messages: Rx.Subject<any>;
  message: Rx.Subject<any>;

  constructor(private httpClient: HttpClient) { }

  /*************************************************************
  * CONNECTING SOCKET, EMITTING SESSIONS & OBSERVING SESSIONS
  *************************************************************/
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
      // return () => {
      //   this.socket.disconnect();
      // }
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

    this.messages = <Rx.Subject<any>>this
      .triggerMessages()
      .pipe(
        map((response: any): any => {
          return response;
        })
      );

    this.message = <Rx.Subject<any>>this
      .triggerNewMessage()
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

  /*************************************************************
  * EMITTING GETMESSAGES & OBSERVING GETMESSAGES
  *************************************************************/
  triggerMessages(): Rx.Subject<MessageEvent> {

    let observable = new Observable(observer => {
      this.socket.on('getmessages', messages => {
        observer.next(messages);
      });
    });

    let observer = {
      next: (payload: Object) => {
        this.socket.emit('getmessages', payload);
      }
    }

    return Rx.Subject.create(observer, observable);
  }

  getMessages(payload) {
    this.messages.next(payload);
  }


/*************************************************************
* EMITTING GETMESSAGES & OBSERVING GETMESSAGES
*************************************************************/
 triggerNewMessage(): Rx.Subject<MessageEvent> {
    let observable = new Observable(observer => {
      this.socket.on('message', messages => {
        observer.next(messages);
      });
    });

    let observer = {
      next: (payload: Object) => {
        this.socket.emit('message', payload);
      }
    }

    return Rx.Subject.create(observer, observable);
  }

  sendMessage(payload) {
    this.message.next(payload);
  }



  switchMode(payload) {
    this.socket.emit('switch', payload);
  }

  disconnectSocket() {
    this.socket.disconnect();
  }
}
