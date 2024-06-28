import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/auth';
    private isLoggedIn = false;

    constructor(private http: HttpClient) { }

    login(usuario: string, contrasena: string): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.apiUrl}/login`, { usuario, contrasena }).pipe(
            tap((response) => {
                if (response) {
                    this.isLoggedIn = true;  // Usuario ha iniciado sesión correctamente
                }
            })
        );
    }
    
    register(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.apiUrl}/register`, usuario);
    }

    logout() {
        this.isLoggedIn = false;
    }

    isAuthenticated(): boolean {
        return this.isLoggedIn;
    }
}
