import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from '../model/Usuario';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/auth';
    private isLoggedIn = false;

    constructor(private http: HttpClient) {
        this.checkInitialAuthState();
    }

    private isLocalStorageAvailable(): boolean {
        try {
            const testKey = 'test';
            localStorage.setItem(testKey, 'test');
            localStorage.removeItem(testKey);
            return true;
        } catch (e) {
            return false;
        }
    }

    private checkInitialAuthState() {
        if (this.isLocalStorageAvailable()) {
            const userData = localStorage.getItem('currentUser');
            this.isLoggedIn = !!userData;
        }
    }

    login(usuario: string, contrasena: string): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.apiUrl}/login`, { usuario, contrasena }).pipe(
            tap((user: Usuario) => {
                if (user) {
                    this.isLoggedIn = true;
                    if (this.isLocalStorageAvailable()) {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    }
                }
            })
        );
    }

    register(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.apiUrl}/register`, usuario);
    }

    logout() {
        this.isLoggedIn = false;
        if (this.isLocalStorageAvailable()) {
            localStorage.removeItem('currentUser');
        }
    }

    isAuthenticated(): boolean {
        return this.isLoggedIn;
    }

    getCurrentUser(): Usuario | null {
        if (this.isLocalStorageAvailable()) {
            const userData = localStorage.getItem('currentUser');
            return userData ? JSON.parse(userData) : null;
        }
        return null;
    }
}