import { Injectable } from '@angular/core';
import { Reservation } from '../../models/reservation/reservation.model';
import { User } from '../../models/user/user.model';
import { Observable } from 'rxjs';
import { AUTH_API } from '../../api-constants';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  getReservationsByUser(user: User): Observable<Reservation[]> {
    const url = `${AUTH_API}reservation/reservesByUserId/${user.userId}`;
    return this.http.get<Reservation[]>(url);
  }

  getAllResrevation(page: number, pageSize: number, headers: any): Observable<Reservation[]> {
      return this.http.get<Reservation[]>(`${AUTH_API}reservation/paginated?page=${page}&size=${pageSize}`, { headers });
  }

  deleteReservation(reservationId: number, headers: any): void{
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
}
