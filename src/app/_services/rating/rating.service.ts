import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rating } from '../../models/rating/rating.model';
import { AUTH_API } from '../../api-constants';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  getRatingsByBookId(bookId: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${AUTH_API}rating/book/${bookId}`);
  }
}