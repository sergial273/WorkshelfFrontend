import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';
import { Observable } from 'rxjs';
import { Editorial } from '../../models/editorial/editorial.model';
import { AUTH_API } from '../../api-constants';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService) { }

  getAllEditorials(page: number, pageSize: number): Observable<Editorial[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

      console.log('Params:', params);
  
      return this.http.get<Editorial[]>(`${AUTH_API}editorial/paginated?page=${page}&size=${pageSize}`, { params });
  }

  getEditorialById(editorialId: number): Observable<Editorial> {
    let editorialUrl = `${AUTH_API}editorial/detail/${editorialId}`;
    console.log(`${AUTH_API}editorial/detail/${editorialId}`)
    return this.http.get<Editorial>(editorialUrl);
  }


  addEditorial(editorialData: any): Observable<any> {
    const editorialUrl = `${AUTH_API}editorial/add`;
    const token = this.tokenService.getToken();

    console.log("add editorial");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    console.log(token)
    console.log(editorialData)
    console.log(editorialUrl)

    return this.http.post<any>(editorialUrl, editorialData, { headers });
  }
}
