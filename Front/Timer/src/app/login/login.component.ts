import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    usuario: string = '';
    contrasena: string = '';
    errorMensaje: string = '';

    constructor(private authService: AuthService, private router: Router) {}
    
    onSubmit() {
        this.authService.login(this.usuario, this.contrasena).subscribe({
            next: (response) => {
                console.log('Login successful', response);
                this.router.navigate(['/home']);
            },
            error: (error: HttpErrorResponse) => {
                // console.error('Login failed', error);
                if (error.status === 401) {
                    this.errorMensaje = 'Usuario o contraseña incorrecta';
                } else {
                    this.errorMensaje = 'Error en el servidor, por favor intente más tarde';
                }
            }
        });
    }
}
