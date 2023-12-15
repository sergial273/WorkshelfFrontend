import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_API, TOKEN_KEY, USER_KEY } from '../../api-constants';
import { BookModule } from '../../models/book/book.module';

@Injectable({
  providedIn: 'root'
})
export class BookserviceService {

  constructor(private http: HttpClient) { }

  getBooks(page: number, pageSize: number): Observable<BookModule[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

      console.log('Params:', params);
  
      return this.http.get<BookModule[]>(`${AUTH_API}book/paginated?page=${page}&size=${pageSize}`, { params });
  }
}
