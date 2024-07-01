import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
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
    selectedCategoria: string | null = null;
    categoriaElegida: string = 'wca';

    sesiones: Sesion[] = [];
    selectedSesion: number | string | 'Nueva' = '';
    nuevaSesionNombre: string = '';

    cronometro: string = '00:00:00';
    activado: boolean = false;
    incio: number = 0;
    tiempoOcurrido: number = 0;
    interval: any;

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
                if (this.categorias.length > 0) {
                    this.selectedCategoria = this.categorias[0].nombre;
                }
            });
            this.obtenSesiones();
        }
    }

    obtenSesiones(): void {
        if (this.currentUser) {
          this.sesionesService.getSesionesByUsuario(this.currentUser.id).subscribe(data => {
            this.sesiones = data;
            if (this.sesiones.length > 0) {
              this.selectedSesion = this.sesiones[0].id;
            }
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

    @HostListener('window:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent): void {
        if (event.code === 'Space') {
            if (this.activado) {
                this.detenerTimer();
            } else {
                this.iniciarTimer();
            }
        }
    }

    iniciarTimer(): void {
        this.activado = true;
        this.incio = Date.now();
        this.interval = setInterval(() => {
            this.tiempoOcurrido = Date.now() - this.incio;
            this.actulizarTimer();
        }, 100);
    }

    detenerTimer(): void {
        this.activado = false;
        clearInterval(this.interval);
        this.guardarTiempo();
    }

    actulizarTimer(): void {
        const time = new Date(this.tiempoOcurrido);
        const minutos = String(time.getUTCMinutes()).padStart(2, '0');
        const segundos = String(time.getUTCSeconds()).padStart(2, '0');
        const milisegundos = String(Math.floor(time.getUTCMilliseconds() / 10)).padStart(2, '0');
        this.cronometro = `${minutos}:${segundos}:${milisegundos}`;
    }

    guardarTiempo(): void {
        console.log('Tiempo guardado:', this.tiempoOcurrido, 'ms');
    }
}
