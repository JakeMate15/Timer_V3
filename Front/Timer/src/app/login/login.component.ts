import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

    constructor(private authService: AuthService, private router: Router) {}
    
    onSubmit() {
        this.authService.login(this.usuario, this.contrasena).subscribe(
          response => {
            console.log('Login successful', response);
            // Redirigir a la página principal después del inicio de sesión
            this.router.navigate(['/']);
          },
          error => {
            console.error('Login failed', error);
          }
        );
      }
}
