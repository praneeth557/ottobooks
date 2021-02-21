import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { io, Manager } from 'socket.io-client';
import { Observable } from 'rxjs';

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

  socket;

  constructor(private httpClient: HttpClient) { }

  getConversations() {
    return this.httpClient.get(
      Constants.API_ENDPOINT + 'sessions'
    );
  }

  setupSocketConnection(apiToken, sessionId) {

    const manager = new Manager(Constants.API_ENDPOINT, {
      reconnectionDelayMax: 10000,
      query: {
        api_token: apiToken,
        session_id: sessionId
      }
    });
    this.socket = manager.socket("/admin");
  }

  sendMsg(msg) {
    this.socket.emit('message', msg);
  }

  onNewMessage() {
    return Observable.create(observer => {
      this.socket.on('message', msg => {
        observer.next(msg);
      });
    });
  }
}
