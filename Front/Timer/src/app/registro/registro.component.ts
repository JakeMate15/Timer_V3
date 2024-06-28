import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { Usuario } from '../model/Usuario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
    usuario: Usuario = new Usuario(0, '', '', '', '', [], []);

    constructor(private authService: AuthService, private router: Router) { }

    onSubmit() {
        this.authService.register(this.usuario).subscribe(
          response => {
            console.log('Registration successful', response);
            // Redirigir a la página de inicio de sesión después del registro
            this.router.navigate(['/login']);
          },
          error => {
            console.error('Registration failed', error);
          }
        );
      }
}
