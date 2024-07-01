import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Intento } from '../model/Intento';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IntentosService {
    private url = "http://localhost:8080/intentos";

    constructor(private http: HttpClient) { }

    creaIntento(intento: Intento): Observable<Intento> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<Intento>(this.url, intento, { headers });
    }

    getIntentos(): Observable<Intento[]> {
        return this.http.get<Intento[]>(this.url).pipe(
            map(data => data.map(item => new Intento(
                item.id,
                item.fecha,
                item.tiempo,
                item.sesion,
                item.categoria
            )))
        );
    }

    getIntentosBySesionId(sesionId: number): Observable<Intento[]> {
        return this.http.get<Intento[]>(`${this.url}/sesion/${sesionId}`).pipe(
            map(data => data.map(item => new Intento(
                item.id,
                item.fecha,
                item.tiempo,
                item.sesion,
                item.categoria
            )))
        );
    }

    getIntento(id: number): Observable<Intento> {
        return this.http.get<Intento>(`${this.url}/${id}`).pipe(
            map(item => new Intento(
                item.id,
                item.fecha,
                item.tiempo,
                item.sesion,
                item.categoria
            ))
        );
    }

    saveIntento(intento: Intento): Observable<Intento> {
        return this.http.post<Intento>(this.url, intento);
    }
    
    updateIntento(intento: Intento): Observable<Intento> {
        // console.log("Hola");
        // console.log(intento);

        // Asegúrate de que el objeto intento tenga todos los campos requeridos
        if (!intento.id || !intento.fecha || !intento.tiempo || !intento.sesion || !intento.categoria) {
            console.error('Intento inválido:', intento);
            throw new Error('El objeto Intento no tiene todos los campos requeridos.');
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.put<Intento>(`${this.url}/${intento.id}`, intento, { headers });
    }
    
    deleteIntento(id: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/${id}`);
    }
}
