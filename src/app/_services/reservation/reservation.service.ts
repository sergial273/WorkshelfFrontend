import { Injectable } from '@angular/core';
import { Reservation } from '../../models/reservation/reservation.model';
import { User } from '../../models/user/user.model';
import { Observable } from 'rxjs';
import { AUTH_API } from '../../api-constants';
import { Book } from '../../models/book/book.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TokenStorageService } from '../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  getReservationsByUser(user: User): Observable<Reservation> {
    let resURL = `${AUTH_API}reservation/reserveByUserId`;
    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Reservation>(resURL, { headers });
  }

  getReservationsByBook(book: Book): Observable<Reservation[]> {
    const url = `${AUTH_API}reservation/reserveByBookId/${book.id}`;
    return this.http.get<Reservation[]>(url);
  }

  addReservation(book: any): Observable<any> {
    const urlReservation = `${AUTH_API}reservation/add`;
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(urlReservation, book, { headers });
  }

  getAllResrevation(page: number, pageSize: number, headers: any): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${AUTH_API}reservation/paginated?page=${page}&size=${pageSize}`, { headers });
  }

  deleteReservation(reservationId: number, headers: any): void {
    let reservationUrl = `${AUTH_API}reservation/delete/${reservationId}`;
    this.http.delete(reservationUrl, { headers })
      .subscribe({
        next: data => {
        },
        error: error => {
          var errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });
  }

  getBookSharing(user: User): Observable<any> {
    const url = `${AUTH_API}reservation/user-owned-books`;
    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Reservation>(url, { headers });
  }
}

