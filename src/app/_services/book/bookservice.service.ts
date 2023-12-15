import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_API, TOKEN_KEY, USER_KEY } from '../../api-constants';

@Injectable({
  providedIn: 'root'
})
export class BookserviceService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any> {
    return this.http.get<any>(`${AUTH_API}book/all`);
  }

}
