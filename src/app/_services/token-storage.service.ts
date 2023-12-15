import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth-user';

const AUTH_API = 'https://backendworkshelf-production.up.railway.app/';


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
        console.log(`saveUser (token storage) ${JSON.stringify(user)}`);
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
      },
      (error) => {
        console.error('Error obteniendo el usuario por correo electrónico:', error);
      }
    );
    // var user = this.getUserByEmail(email);
    // console.log(`saveUser (token storage) ${JSON.stringify(user)}`);
    // window.sessionStorage.removeItem(USER_KEY);
    // window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
  
  // getUserByEmail(email: string) {
  //   console.log('Token desde la función getUserByEmail: ' + JSON.stringify(this.getToken()));

  //   var headers: any = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${this.getToken()}`
  //   });

  //   console.log("header info: " + JSON.stringify(headers))
  //   console.log('Headers:', headers.keys()); // Imprime las claves (nombres) de los encabezados
  //   console.log('Authorization Header:', headers.get('Authorization')); // Imprime el valor del encabezado de autorización

  //   return this.http.get(AUTH_API + 'user/byEmail?email=' + email, { headers });
  // }

  getUserByEmail(email: string): Observable<any> {
    // Obtener el token desde el sessionStorage o localStorage
    const token = this.getToken();
    console.log("tokey key " + TOKEN_KEY)
    console.log('Token desde Getuserbyemail:', token);

    console.log(`token rom Getuserbyemail ${token}`);

    // Configurar los encabezados con el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Realizar la solicitud HTTP con los encabezados
    return this.http.get(`${AUTH_API}user/byEmail?email=${email}`, { headers });
  }

  
}
