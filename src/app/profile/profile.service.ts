import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants';

export interface IProfile {
  firstname: string,
  lastname: string,
  email: string,
  company?: string,
  accountId?: string
}

export class Profile {
  constructor(
    public firstname: string,
    public lastname: string,
    public email: string,
    public company?: string,
    public accountId?: string
  ){

  }
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  updateProfile(reqObj:IProfile) {
    return this.http.put(
      Constants.API_ENDPOINT + 'users',
      reqObj
    );
  }
}
