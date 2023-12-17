import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_API, TOKEN_KEY, USER_KEY } from '../../api-constants';
import { Book } from '../../models/book/book.model';
import { TokenStorageService } from '../token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class BookserviceService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService) { }

  getAllBooks(page: number, pageSize: number): Observable<Book[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
  
      return this.http.get<Book[]>(`${AUTH_API}book/paginated?page=${page}&size=${pageSize}`, { params });
  }

  getBookById(bookId: number): Observable<Book> {
    let bookUrl = `${AUTH_API}book/detail/${bookId}`;
    return this.http.get<Book>(bookUrl);
  }


  addBook(bookData: any): Observable<Book> {
    const bookUrl = `${AUTH_API}book/add`;
    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(token)

    return this.http.post<Book>(bookUrl, bookData, { headers });
  }

  
  deleteBook(bookId: number, headers: any): void{
    let bookUrl = `${AUTH_API}book/delete/${bookId}`;

    this.http.delete(bookUrl, { headers })
        .subscribe({
            next: data => {
            },
            error: error => {
                var errorMessage = error.message;
                console.error('There was an error!', error);
            }
        });
  }
}
