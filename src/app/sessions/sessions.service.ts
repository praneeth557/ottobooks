import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants';

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

  constructor(private httpClient: HttpClient) { }

  getConversations() {
    return this.httpClient.get(
      Constants.API_ENDPOINT + 'sessions'
    );

    //return this.conversations;
  }
}
