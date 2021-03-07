import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants';

export interface Shortcut {
  name: string,
  text: string,
  id?: string
}

@Injectable({
  providedIn: 'root'
})
export class ShortcutsService {

  constructor(private httpclient: HttpClient) { }

  getShortcuts() {
    return this.httpclient.get(
      Constants.API_ENDPOINT + 'shortcuts'
    );
  }

  postShortcut(name, text) {
    return this.httpclient.post(
      Constants.API_ENDPOINT + 'shortcuts',
      {name: name, text: text}
    );
  }

  putShortcut(id, name, text) {
    return this.httpclient.put(
      Constants.API_ENDPOINT + 'shortcuts',
      {id: id, name: name, text: text}
    );
  }
}
