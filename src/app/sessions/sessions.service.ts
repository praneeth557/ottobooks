import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { Manager } from 'socket.io-client';
import { Observable } from 'rxjs';

export interface Session{
  id: string,
  last_message: string,
  started_at: string,
  updated_at: string
}

export const environment = {
  production: false,
  SOCKET_ENDPOINT: 'http://ec2-3-17-63-108.us-east-2.compute.amazonaws.com:5000/admin'
};

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  conversations: any = [
    {
      "id": "55b58158-f915-4558-a30e-efb9282bafb1",
      "started_at": "2021-02-19 01:15:29.632209",
      "updated_at": "2021-02-19 01:15:29.632209",
      "last_message": "hello"
    },
    {
      "id": "55b58158-f915-4558-a30e-efb9282bafb1",
      "started_at": "2021-02-19 01:15:29.632209",
      "updated_at": "2021-02-19 01:15:29.632209",
      "last_message": "hello"
    },
    {
      "id": "55b58158-f915-4558-a30e-efb9282bafb1",
      "started_at": "2021-02-19 01:15:29.632209",
      "updated_at": "2021-02-19 01:15:29.632209",
      "last_message": "hello"
    },
    {
      "id": "55b58158-f915-4558-a30e-efb9282bafb1",
      "started_at": "2021-02-19 01:15:29.632209",
      "updated_at": "2021-02-19 01:15:29.632209",
      "last_message": "hello"
    },
    {
      "id": "55b58158-f915-4558-a30e-efb9282bafb1",
      "started_at": "2021-02-19 01:15:29.632209",
      "updated_at": "2021-02-19 01:15:29.632209",
      "last_message": "hello"
    },
    {
      "id": "55b58158-f915-4558-a30e-efb9282bafb1",
      "started_at": "2021-02-19 01:15:29.632209",
      "updated_at": "2021-02-19 01:15:29.632209",
      "last_message": "hello"
    },
    {
      "id": "55b58158-f915-4558-a30e-efb9282bafb1",
      "started_at": "2021-02-19 01:15:29.632209",
      "updated_at": "2021-02-19 01:15:29.632209",
      "last_message": "hello"
    },
    {
      "id": "55b58158-f915-4558-a30e-efb9282bafb1",
      "started_at": "2021-02-19 01:15:29.632209",
      "updated_at": "2021-02-19 01:15:29.632209",
      "last_message": "hello"
    },
    {
      "id": "55b58158-f915-4558-a30e-efb9282bafb1",
      "started_at": "2021-02-19 01:15:29.632209",
      "updated_at": "2021-02-19 01:15:29.632209",
      "last_message": "hello, how are you? Will you be able to"
    }
  ]

  socket;

  constructor(private httpClient: HttpClient) { }

  getConversations() {
    return this.httpClient.get(
      Constants.API_ENDPOINT + 'sessions'
    );
  }

  setupSocketConnection(apiToken, sessionId) {
    const manager = new Manager(
      'http://ec2-3-17-63-108.us-east-2.compute.amazonaws.com:5000/admin',
      {
        query: {
          api_token: apiToken,
          session_id: sessionId
        }
      }
    );

    const socket = manager.socket("/admin");

    // this.socket = io(
    //   'http://ec2-3-17-63-108.us-east-2.compute.amazonaws.com:5000/admin',
    //   {
    //     query: {
    //       api_token: apiToken,
    //       session_id: sessionId
    //     }
    //   }
    // )
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
