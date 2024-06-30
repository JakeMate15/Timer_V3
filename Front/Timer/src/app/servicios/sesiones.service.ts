import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sesion } from '../model/Sesion';

@Injectable({
  providedIn: 'root'
})
export class SesionesService {
  private url = 'http://localhost:8080/sesiones';

  constructor(private http: HttpClient) { }

  // getSesionesByUsuario(usuarioId: number): Observable<Sesion[]> {
  //   return this.http.get<Sesion[]>()
  // }
}
