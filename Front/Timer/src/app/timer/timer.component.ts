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
import { IntentosService } from '../servicios/intentos.service';
import { Intento } from '../model/Intento';

declare var scramble_333: any;

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
    sesionAct: Sesion = new Sesion();

    cronometro: string = '00:00:00';
    activado: boolean = false;
    inicio: number = 0;
    tiempoOcurrido: number = 0;
    interval: any;

    scramble: string = "";

    intentos: Intento[] = [];
    avg5: string = '00:00:00';
    ao12: string = '00:00:00';

    constructor(
        private categoriaService: CategoriasService,
        private authService: AuthService,
        private sesionesService: SesionesService,
        private intentoService: IntentosService
    ) { }

    ngOnInit(): void {
        this.currentUser = this.authService.getCurrentUser();
        if (this.currentUser) {
            this.categoriaService.getCategorias().subscribe(data => {
                this.categorias = data;
                if (this.categorias.length > 0) {
                    this.selectedCategoria = this.categorias[0].nombre;
                    this.generarScramble();
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
                    this.obtenerIntentos(this.sesiones[0].id);
                    this.sesionAct = this.sesiones[0];
                    this.promedios();
                }
            });
        }
    }

    obtenerIntentos(sesionId: number): void {
        this.intentoService.getIntentosBySesionId(sesionId).subscribe(data => {
            this.intentos = data.map((intento: any) => new Intento(
                intento.id,
                intento.fecha,
                intento.tiempo,
                intento.sesion,
                intento.categoria
            ));
            this.promedios(); 
        });
    }
    
    

    onCategoriaChange(value: string) {
        this.categoriaElegida = value;
        this.generarScramble();
    }

    onSesionChange(event: any) {
        this.selectedSesion = event.target.value;
        if (this.selectedSesion === 'Nueva') {
            const modal = document.getElementById('nuevaSesionModal');
            if (modal) {
                modal.classList.add('show');
                modal.style.display = 'block';
            }
        } else {
            this.sesionAct = this.sesiones[(this.selectedSesion as number) - 1];
            this.obtenerIntentos(this.sesionAct.id);
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
                this.sesionAct = sesion;
                this.intentos = [];
                this.promedios(); 
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
        this.inicio = Date.now();
        this.interval = setInterval(() => {
            this.tiempoOcurrido = Date.now() - this.inicio;
            this.actualizarTimer();
        }, 100);
    }

    detenerTimer(): void {
        this.activado = false;
        clearInterval(this.interval);
        this.guardarTiempo();
    }

    actualizarTimer(): void {
        const time = new Date(this.tiempoOcurrido);
        const minutos = String(time.getUTCMinutes()).padStart(2, '0');
        const segundos = String(time.getUTCSeconds()).padStart(2, '0');
        const milisegundos = String(Math.floor(time.getUTCMilliseconds() / 10)).padStart(2, '0');
        this.cronometro = `${minutos}:${segundos}.${milisegundos}`;
    }

    guardarTiempo(): void {
        const currentUser = this.authService.getCurrentUser();
        const selectedCategoria = this.categorias.find(categoria => categoria.nombre === this.categoriaElegida);

        if (currentUser && selectedCategoria && this.sesionAct) {
            const intento = new Intento(
                0,
                new Date().toISOString(),
                this.tiempoOcurrido,
                this.sesionAct,
                selectedCategoria, 
                this.scramble
            );

            this.intentoService.creaIntento(intento).subscribe(response => {
                // console.log('Intento guardado:', response);
                this.obtenerIntentos(this.sesionAct.id);
                this.promedios();
            });
        }
    }

    promedios(): void {
        const tiempos: number[] = this.intentos.map(Intento => Intento.tiempo);
    
        if (tiempos.length >= 5) {
            const ultimos5 = tiempos.slice(-5);
            const promedio5 = ultimos5.reduce((a, b) => a + b, 0) / ultimos5.length;
            this.avg5 = this.convertirTiempo(promedio5);
        } else {
            this.avg5 = '-';
        }
    
        if (tiempos.length >= 13) {
            const ultimos13 = tiempos.slice(-13);
            const promedio13 = ultimos13.reduce((a, b) => a + b, 0) / ultimos13.length;
            this.ao12 = this.convertirTiempo(promedio13);
        } else {
            this.ao12 = '-';
        }
    }
    
    convertirTiempo(ms: number): string {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = Math.floor((ms % 1000) / 10); // Convert to two-digit format
    
        return `${this.pad(minutes)}:${this.pad(seconds)}.${this.pad(milliseconds)}`;
    }
    
    pad(num: number): string {
        return num.toString().padStart(2, '0');
    }
    

    agregar2Segundos(): void {
        if (this.intentos.length > 0) {
            const ultimoIntento = this.intentos[this.intentos.length - 1];
            // console.log(ultimoIntento);
            ultimoIntento.tiempo += 2000;
            ultimoIntento.sesion = this.sesionAct;
            this.intentoService.updateIntento(ultimoIntento).subscribe(updatedIntento => {
                console.log('Tiempo actualizado:', updatedIntento.tiempo, 'ms');
            });
        } else {
            console.log('No hay intentos para actualizar.');
        }
    }    

    eliminarUltimoIntento(): void {
        const ultimoIntento = this.intentos.pop();
        if (ultimoIntento) {
            this.intentoService.deleteIntento(ultimoIntento.id).subscribe(() => {
                console.log('Último intento eliminado');
            });
        }
    }

    generarScramble(): void {
        switch (this.categoriaElegida) {
            case 'wca':
                this.scramble = scramble_333.genWca();
                break;
            case 'cruzR':
                this.scramble = scramble_333.genF2L();
                break;
            case 'LL':
                this.scramble = scramble_333.genLL();
                break;
            case 'esquinas':
                this.scramble = scramble_333.genAristas();
                break;
            case 'aristas':
                this.scramble = scramble_333.genEsq();
                break;
            default:
                this.scramble = '';
        }
    }
}
