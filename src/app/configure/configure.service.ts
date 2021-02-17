import { Injectable } from '@angular/core';

export interface IConfig {
  title: string,
  subtitle: string,
  greeting: string,
  placeholder: string,
  accountId: string
}

@Injectable({
  providedIn: 'root'
})
export class ConfigureService {

  constructor() { }

  config: IConfig = {
    title : "Welcome",
    subtitle : "Ask us anything in the chat below",
    greeting : "Hello",
    placeholder : "Start typing...",
    accountId : ""
  }

  getConfig() {
    return this.config;
  }
}
