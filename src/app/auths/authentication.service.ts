import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from '../shared/user.model';
import { environment } from '../../environments/environment';

export interface AuthResponseData{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})

export class AuthenticationService{

  user = new BehaviorSubject<User>(null);
  private timer: any;

  constructor(
    private http: HttpClient,
    private router: Router
    ){}

  signup(userEmail: string, userPassword: string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey,
      {
        email: userEmail,
        password: userPassword,
        returnSecureToken : true
      }
    ).pipe(
      catchError(this.handleErrors),
      tap((resData) => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      })
    );
  }

  autologin(){
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpDate: Date
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData){
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpDate)
    );
    if (loadedUser.token){
      this.user.next(loadedUser);
      const expDuration = new Date(userData._tokenExpDate).getTime() - new Date().getTime();
      this.autoLogout(expDuration);
    }
  }

  autoLogout(expDuration: number){
    this.timer = setTimeout(() => {
      this.logout();
    }, expDuration);
  }

  login(userEmail: string, userPassword: string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey,
      {
        email: userEmail,
        password: userPassword,
        returnSecureToken : true
      }
    ).pipe(
      catchError(this.handleErrors),
      tap((resData) => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      })
    );
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/home']);
    localStorage.removeItem('userData');
    if (this.timer){
      clearTimeout(this.timer);
    }
    this.timer = null;
  }

  private handleAuthentication(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number
  ){
    const expDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(
      email,
      localId,
      idToken,
      expDate
    );
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(expiresIn * 1000);
  }

  private handleErrors(errRes: HttpErrorResponse){
    let errorMsg = 'An unknown error occured!!!';
    if (!errRes.error || !errRes.error.error){
      return throwError(errorMsg);
    }
    switch (errRes.error.error.message){
      case 'EMAIL_EXISTS' : {
        errorMsg = 'This email address is already in use by another account.';
        break;
      }
      case 'OPERATION_NOT_ALLOWED' : {
        errorMsg = 'Password sign-in is disabled for this application';
        break;
      }
      case 'TOO_MANY_ATTEMPTS_TRY_LATER' : {
        errorMsg = 'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      }
      case 'EMAIL_NOT_FOUND' : {
        errorMsg = 'Email not Found!!! The user may have been deleted.';
        break;
      }
      case 'INVALID_PASSWORD' : {
        errorMsg = 'The password is invalid!!!';
        break;
      }
      case 'USER_DISABLED' : {
        errorMsg = 'The user account has been disabled by an administrator.';
        break;
      }
    }
    return throwError(errorMsg);
  }
}
