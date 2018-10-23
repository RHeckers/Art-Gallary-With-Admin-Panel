import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from '../models/AuthData';
import { subscribeOn } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  status: boolean;

  constructor(private http: HttpClient) { }

  getStatus() {
    return this.http.get<Array<AuthData>>('http://localhost:3000/api/auth');
  }

  createUser(email: string, password: string){
    const authData: AuthData = { email: email, password: password}
    return this.http.post('http://localhost:3000/api/auth/signup', authData)
      
  }

  login(email: string, password: string){
    const authData: AuthData = { email: email, password: password}
    return this.http.post('http://localhost:3000/api/auth/signin', authData);
  }
}
