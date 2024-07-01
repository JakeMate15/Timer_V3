import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private apiCategorias = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) { }

  getCategorias (): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiCategorias);
}
}
