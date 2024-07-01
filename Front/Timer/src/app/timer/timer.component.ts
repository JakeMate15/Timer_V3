import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Categoria } from '../model/Categoria';
import { CommonModule } from '@angular/common';
import { CategoriasService } from '../servicios/categorias.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';
import { Usuario } from '../model/Usuario';
import { SesionesService } from '../servicios/sesiones.service';
import { Sesion } from '../model/Sesion';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})

export class TimerComponent {
    currentUser: Usuario | null = null;
    categorias: Categoria[] = [];
    selectedCategoria: Categoria | null = null;
    categoriaElegida: string = 'wca';
    sesiones: Sesion[] = [];
    selectedSesion: number | string | 'Nueva' = '';
    nuevaSesionNombre: string = '';

    constructor (
        private categoriaService: CategoriasService, 
        private authService: AuthService, 
        private sesionesService: SesionesService,
    ) { }

    ngOnInit(): void {
        this.currentUser = this.authService.getCurrentUser();
        if (this.currentUser) {
            this.categoriaService.getCategorias().subscribe(data => {
                this.categorias = data;
            });
            this.obtenSesiones();
        }
    }

    obtenSesiones(): void {
        if (this.currentUser) {
            this.sesionesService.getSesionesByUsuario(this.currentUser.id).subscribe(data => {
                this.sesiones = data;
            });
        }
    }

    onCategoriaChange(value: string) {
        this.categoriaElegida = value;
    }

    onSesionChange(event: any) {
        this.selectedSesion = event.target.value;
        if (this.selectedSesion === 'Nueva') {
            const modal = document.getElementById('nuevaSesionModal');
            if (modal) {
                modal.classList.add('show');
                modal.style.display = 'block';
            }
        }
    }

    closeModal() {
        const modal = document.getElementById('nuevaSesionModal');
        if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
            modal.removeAttribute('aria-modal');
            modal.removeAttribute('role');
        }
    }

    crearSesion() {
        const currentUser = this.authService.getCurrentUser();
        const selectedCategoria = this.categorias.find(categoria => categoria.nombre === this.categoriaElegida);

        if (this.nuevaSesionNombre.trim() && currentUser && selectedCategoria) {
            const nuevaSesion: Sesion = {
                id: 0,
                nombre: this.nuevaSesionNombre,
                categoria: selectedCategoria,
                usuario: currentUser,
                intentos: []
            };

            this.sesionesService.createSesion(nuevaSesion).subscribe(sesion => {
                this.sesiones.push(sesion);
                this.nuevaSesionNombre = '';
                this.selectedSesion = sesion.id;
                this.closeModal();
            });
        }
    }
}
