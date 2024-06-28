import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { Usuario } from '../model/Usuario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
    usuario: Usuario = new Usuario(0, '', '', '', '', [], []);
    errorMensaje: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    onSubmit() {
        this.authService.register(this.usuario).subscribe({
            next: (response) => {
                console.log('Registration successful', response);
                this.router.navigate(['/login']); 
            },
            error: (error: HttpErrorResponse) => {
                console.error('Registration failed', error);
                if (error.status === 409) {
                    this.errorMensaje = 'El nombre de usuario ya está en uso, elija otro.';
                } else {
                    this.errorMensaje = 'Error durante el registro, por favor intente más tarde.';
                }
            }
        });
    }
}
