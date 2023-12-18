import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { User } from '../models/user/user.model';

const AUTH_API = 'https://backendworkshelf-production.up.railway.app/';

// 'Authorization': `Bearer ${this.authToken}`

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService
  ) {}

  getPublicContent(): Observable<any> {
    return this.http.get(AUTH_API + 'all', { responseType: 'text' });
  }

  updateUser(id: number, updatedData: any): Observable<any> {
    var token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<any>(AUTH_API + id, updatedData);
  }

  getUserBoard(): Observable<any> {
    return this.http.get(AUTH_API + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(AUTH_API + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(AUTH_API + 'admin', { responseType: 'text' });
  }

  getAllUser(
    page: number,
    pageSize: number,
    headers: any
  ): Observable<User[]> {
    return this.http.get<User[]>(
      `${AUTH_API}user/paginated?page=${page}&size=${pageSize}`,
      { headers }
    );
  }

  deleteUser(userId: number, headers: any): void {
    let userUrl = `${AUTH_API}user/delete/${userId}`;
    console.log(userUrl);
    this.http.delete(userUrl, { headers }).subscribe({
      next: (data) => {console.log("works")},
      error: (error) => {
        var errorMessage = error.message;
        console.error('There was an error!', error);
      },
    });
  }
}
