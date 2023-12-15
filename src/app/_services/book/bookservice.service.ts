import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_API, TOKEN_KEY, USER_KEY } from '../../api-constants';
import { Book } from '../../models/book/book.model';


@Injectable({
  providedIn: 'root'
})
export class BookserviceService {

  constructor(private http: HttpClient) { }

  getBooks(page: number, pageSize: number): Observable<Book[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

      console.log('Params:', params);
  
      return this.http.get<Book[]>(`${AUTH_API}book/paginated?page=${page}&size=${pageSize}`, { params });
  }

  getBookById(bookId: number): Observable<Book> {
    let bookUrl = `${AUTH_API}book/detail/${bookId}`;
    console.log(`${AUTH_API}book/detail/${bookId}`)
    return this.http.get<Book>(bookUrl);
  }
}
