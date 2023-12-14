import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://backendworkshelf-production.up.railway.app/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
        username,
        password,
      }, httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    console.log("registter from auth service")
    const ROLE = 2;
    var id : number = ROLE;
    console.log({
      username,
      email,
      password,
      "role" :{
        id
      }
    })
    return this.http.post(

      AUTH_API + 'user/add',
      {
        username,
        email,
        password,
        "role" :{
          id
        }
      }, httpOptions 
    );
  }
}
