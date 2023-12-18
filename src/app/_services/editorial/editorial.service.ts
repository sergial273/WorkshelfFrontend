import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';
import { Observable } from 'rxjs';
import { Editorial } from '../../models/editorial/editorial.model';
import { AUTH_API, TOKEN_KEY } from '../../api-constants';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${TOKEN_KEY}`
  });

  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService) { }


  getAllEditorials () {
    let allEditorialsUrl = `${AUTH_API}editorial/all`;
    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    console.log(token)    
    console.log(allEditorialsUrl)
    return this.http.get<Editorial[]>(allEditorialsUrl, {headers});
  }


  getEditorialsPaginated(page: number, pageSize: number): Observable<Editorial[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

      console.log('Params:', params);
  
      return this.http.get<Editorial[]>(`${AUTH_API}editorial/paginated?page=${page}&size=${pageSize}`, { params });
  }


  getEditorialByIdString(editorialId: string): Observable<Editorial> {
    let editorialUrl = `${AUTH_API}editorial/detail/${editorialId}`;
    return this.http.get<Editorial>(editorialUrl);
  }

  getEditorialByIdNumber(editorialId: number): Observable<Editorial> {
    let editorialUrl = `${AUTH_API}editorial/detail/${editorialId}`;
    return this.http.get<Editorial>(editorialUrl);
  }


  addEditorial(editorialData: any): Observable<any> {
    const editorialUrl = `${AUTH_API}editorial/add`;
    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(editorialUrl, editorialData, { headers });
  }

  udateEditorial(editorialId: number, editorialData: any): Observable<Editorial> {
    const eidtorialUrl = `${AUTH_API}editorial/update/${editorialId}`;
    const token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<Editorial>(eidtorialUrl, editorialData, { headers });
  }

  deleteEditorial(editorialId: number, headers: any): void {
    let editorialUrl = `${AUTH_API}editorial/delete/${editorialId}`;
    console.log(editorialUrl);
    this.http.delete(editorialUrl, { headers }).subscribe({
      next: (data) => {console.log("works")},
      error: (error) => {
        var errorMessage = error.message;
        console.error('There was an error!', error);
      },
    });
  }

}
