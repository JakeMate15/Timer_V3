import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sesion } from '../model/Sesion';

@Injectable({
  providedIn: 'root'
})
export class SesionesService {
    private url = 'http://localhost:8080/sesiones';

    constructor(private http: HttpClient) { }

    getSesionesByUsuario(usuarioId: number): Observable<Sesion[]> {
        return this.http.get<Sesion[]>(`${this.url}/usuario/${usuarioId}`);
    }

    createSesion(sesion: Sesion): Observable<Sesion> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<Sesion>(this.url, sesion, { headers });
    }
}
