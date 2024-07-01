import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AmigosService {
    private apiUrl = 'http://localhost:8080/amigos';

    constructor(private http: HttpClient) {}

    buscarUsuario(username: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/buscar/${username}`);
    }

    agregarAmigo(userId: number, amigoId: number): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/agregar`, { userId, amigoId });
    }

    obtenerAmigos(userId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/lista/${userId}`);
    }

    eliminarAmigo(userId: number, amigoId: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/eliminar/${userId}/${amigoId}`);
    }
}
