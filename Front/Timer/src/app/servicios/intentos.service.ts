import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Intento } from '../model/Intento';
import { Observable } from 'rxjs';

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
}
