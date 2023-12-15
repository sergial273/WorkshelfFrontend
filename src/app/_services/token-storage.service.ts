import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const AUTH_API = 'https://backendworkshelf-production.up.railway.app/';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth-user';
const USER_ROLES_KEY = 'user-roles';

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
  

  public getRoles(): string | null {
    return window.sessionStorage.getItem(USER_ROLES_KEY);
  }
  
  public saveRoles(roles: any): void {
    window.sessionStorage.removeItem(USER_ROLES_KEY);
    window.sessionStorage.setItem(USER_ROLES_KEY, JSON.stringify(roles));
  }

  public async saveUser(email:string): Promise<void>  {
    try {
      const user = await this.getUserByEmail(email).toPromise();
      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error obteniendo el usuario por correo electrónico:', error);
      throw error;
    }
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
