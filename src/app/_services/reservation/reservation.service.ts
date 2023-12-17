import { Injectable } from '@angular/core';
import { Reservation } from '../../models/reservation/reservation.model';
import { User } from '../../models/user/user.model';
import { Observable } from 'rxjs';
import { AUTH_API } from '../../api-constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  getReservationsByUser(user: User): Observable<Reservation[]> {
    const url = `${AUTH_API}reservation/reservesByUserId/${user.userId}`;
    return this.http.get<Reservation[]>(url);
  }
}