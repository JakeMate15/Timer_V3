import { Component } from '@angular/core';
import { AmigosService } from '../servicios/amigos-service.service';
import { AuthService } from '../servicios/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-amigos',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './amigos.component.html',
    styleUrl: './amigos.component.css'
})
export class AmigosComponent {
    username: string = '';
    usuarioEncontrado: any = null;
    amigos: any[] = [];
    currentUser: any;

    constructor(
        private amigosService: AmigosService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.currentUser = this.authService.getCurrentUser();
        if (this.currentUser) {
            this.obtenerAmigos();
        }
      }
    
    buscarUsuario(): void {
        if (this.username.trim()) {
            this.amigosService.buscarUsuario(this.username).subscribe(usuario => {
                this.usuarioEncontrado = usuario;
            });
        }
    }
    
    agregarAmigo(amigoId: number): void {
        if (this.currentUser) {
            this.amigosService.agregarAmigo(this.currentUser.id, amigoId).subscribe(() => {
                this.obtenerAmigos();
                this.usuarioEncontrado = null;
                this.username = '';
            });
        }
    }
    
    obtenerAmigos(): void {
        if (this.currentUser) {
            this.amigosService.obtenerAmigos(this.currentUser.id).subscribe(amigos => {
                this.amigos = amigos;
            });
        }
    }
    
    eliminarAmigo(amigoId: number): void {
        if (this.currentUser) {
            this.amigosService.eliminarAmigo(this.currentUser.id, amigoId).subscribe(() => {
                this.obtenerAmigos();
            });
        }
    }
}
