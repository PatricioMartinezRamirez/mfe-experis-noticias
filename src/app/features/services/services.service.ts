import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../interfaces/article.interfaces'
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiUrlExt = 'https://api.spaceflightnewsapi.net/v4/articles';
  private apiUrl = 'http://localhost:8080/favorite';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlExt);
  }

  getAllFavorites(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+`/listar-noticias-favoritas`);
  }

  addFavorite(favorite: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, favorite);
  }
}
