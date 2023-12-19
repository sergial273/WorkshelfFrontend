import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rating } from '../../models/rating/rating.model';
import { AUTH_API } from '../../api-constants';
import { TokenStorageService } from '../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient,
    private tokenService: TokenStorageService) { }

  getRatingsByBookId(bookId: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${AUTH_API}rating/book/${bookId}`);
  }

  addRating(rating: Rating): Observable<Rating> {
    const bookUrl = `${AUTH_API}rating/add`;
    const token = this.tokenService.getToken();
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Rating>(bookUrl, rating, { headers });
  }

}