import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/auth';

    constructor(private http: HttpClient) { }

    login(usuario: string, contrasena: string): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.apiUrl}/login`, { usuario, contrasena });
    }
    
    register(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.apiUrl}/register`, usuario);
    }
}
