import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { io, Manager } from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { map } from 'rxjs/operators';

export interface Session{
  id: string,
  last_message: string,
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

  constructor(private httpClient: HttpClient) { }

  getConversations() {
    return this.httpClient.get(
      Constants.API_ENDPOINT + 'sessions'
    );
  }

  connect(apiToken, sessionId): Rx.Subject<MessageEvent> {
    const manager = new Manager(Constants.API_ENDPOINT, {
      reconnectionDelayMax: 10000,
      query: {
        api_token: apiToken,
        session_id: sessionId
      }
    });
    this.socket = manager.socket("/admin");

    let observable = new Observable(observer => {
      this.socket.on('message', msg => {
        observer.next(msg);
      })
      return () => {
        this.socket.disconnect();
      }
    })

    let observer = {
      next: (data: Object) => {
        this.socket.emit('message', data);
      }
    }

    return Rx.Subject.create(observer, observable);
  }

  setupSocketConnection(apiToken, sessionId) {
    this.messages = <Rx.Subject<any>>this
      .connect(apiToken, sessionId)
      .pipe(
        map((response: any): any => {
          return response;
        })
      );
  }

  sendMsg(msg) {
    this.messages.next(msg);
  }

  switchMode(type) {
    this.socket.emit('switch', type);
  }
}
