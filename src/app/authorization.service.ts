import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, ISignUp, ISignIn } from './user';
import { Constants } from './constants';
import {  Observable, BehaviorSubject } from 'rxjs';
import {catchError, tap} from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {

  user = new BehaviorSubject<User | null>(null);
  loggedIn = false;

  constructor(private http: HttpClient) { }

  createUser(signupReq: ISignUp) {
    return this.http.post(
      Constants.API_ENDPOINT + 'signup', 
      signupReq
    );
  }

  validateUser(signinReq: ISignIn) {
    return this.http.post(
      Constants.API_ENDPOINT + 'signin', 
      signinReq
    ).pipe(
      catchError((error, caught) => {
        return Observable.throw(error);
      }),
      tap((resData: any) => {
        const userResData: any = {
          firstname: resData.firstname,
          lastname: resData.lastname,
          email: resData.email,
          company: resData.company,
          companyId: resData.companyid,
          userId: resData.userid,
          _token: resData.token,
          _tokenExpirationDate: new Date(new Date().getTime() + 3000 * 1000),
          domain: resData.domain,
          subdomain: resData.subdomain
        } 
        this.handleAuthentication(userResData);
      })
    );
  }

  removeUser() {
    return this.http.get(
      Constants.API_ENDPOINT + 'signout'
    ).pipe(
      catchError((error, caught) => {
        return Observable.throw(error);
      }),
      tap((resData: any) => {
        this.user.next(null);
        localStorage.removeItem('userData');
      })
    )
  }

  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        resolve(this.loggedIn);
      }
    )
    return promise;
  }

  private handleAuthentication(user: any) {
    const currentUser = new User(user.firstname, user.lastname, user.email, user.company, user.companyId, user.userId, user._token, user._tokenExpirationDate, user.domain, user.subdomain);
    this.user.next(currentUser);
    localStorage.setItem('userData', JSON.stringify(currentUser));
  }

  updateUserData(userData: User) {
    this.handleAuthentication(userData);
  }

  autoLogin() {
    const userData: any = localStorage.getItem('userData');
    if(!userData) {
      return;
    }
    const parsedData = JSON.parse(userData);
    
    const loadedUser = new User(parsedData.firstname, parsedData.lastname, parsedData.email, parsedData.company, parsedData.companyId, parsedData.userId, parsedData._token, new Date(parsedData._tokenExpirationDate), parsedData.domain, parsedData.subdomain);
    if(loadedUser.token) {
      this.user.next(loadedUser);
    }
  }
}
