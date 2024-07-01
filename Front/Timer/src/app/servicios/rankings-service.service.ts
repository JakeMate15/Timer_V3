import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { Intento } from '../model/Intento';

@Injectable({
  providedIn: 'root'
})
export class RankingsService {
    private apiUrl = 'http://localhost:8080/rankings';

    constructor(private http: HttpClient) {}

    getRecords(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/records`);
    }

    getPersonalRecords(userId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/personal-records/${userId}`);
    }
}
