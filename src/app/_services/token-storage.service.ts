import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AUTH_API, TOKEN_KEY, USER_KEY } from '../api-constants';


@Injectable({
  providedIn: 'root',
})

export class TokenStorageService {
  constructor(private authService: AuthService, private http: HttpClient) {  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: any): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token.token);
  }
  
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  
  public saveUser(email:string): void {
    this.getUserByEmail(email).subscribe(
      (user) => {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
      },
      (error) => {
        console.error('Error obteniendo el usuario por correo electrónico:', error);
      }
      );
    }
    
    public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  getUserByEmail(email: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${AUTH_API}user/byEmail?email=${email}`, { headers });
  }
}
