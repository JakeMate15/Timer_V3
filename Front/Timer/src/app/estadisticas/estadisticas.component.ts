import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { Sesion } from '../model/Sesion';
import { Intento } from '../model/Intento';
import { SesionesService } from '../servicios/sesiones.service';
import { IntentosService } from '../servicios/intentos.service';
import { AuthService } from '../servicios/auth.service';

@Component({
    selector: 'app-estadisticas',
    standalone: true,
    imports: [CommonModule, FormsModule, CarouselModule, ChartModule],
    templateUrl: './estadisticas.component.html',
    styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
    sesiones: Sesion[] = [];
    selectedSesion: Sesion = new Sesion();
    intentos: Intento[] = [];
    paginatedIntentos: Intento[] = [];
    currentPage: number = 0;
    itemsPerPage: number = 10;
    promedioGeneral: string = '';
    data: any;
    options: any;

    constructor(
        private sesionService: SesionesService,
        private intentoService: IntentosService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            this.sesionService.getSesionesByUsuario(currentUser.id).subscribe(sesiones => {
                this.sesiones = sesiones;
                if (this.sesiones.length > 0) {
                    this.selectedSesion = this.sesiones[0];
                    this.cargarIntentos(this.selectedSesion.id);
                }
            });
        }
    }

    cargarIntentos(sesionId: number): void {
        this.intentoService.getIntentosBySesionId(sesionId).subscribe(intentos => {
            this.intentos = intentos;
            this.paginateIntentos();
            this.calcularPromedioGeneral();
            this.cargarGrafica();
        });
    }

    paginateIntentos(): void {
        const start = this.currentPage * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        this.paginatedIntentos = this.intentos.slice(start, end);
    }

    calcularPromedioGeneral(): void {
        if (this.intentos.length > 0) {
            const total = this.intentos.reduce((sum, intento) => sum + intento.tiempo, 0);
            const promedio = total / this.intentos.length;
            this.promedioGeneral = this.formatearTiempo(promedio);
        } else {
            this.promedioGeneral = '';
        }
    }

    cargarGrafica(): void {
        if (this.intentos.length > 0) {
            const promedio = this.intentos.reduce((sum, intento) => sum + intento.tiempo, 0) / this.intentos.length;
            this.data = {
                labels: this.intentos.map((_, index) => `Intento ${index + 1}`),
                datasets: [
                    {
                        label: 'Tiempos',
                        data: this.intentos.map(intento => intento.tiempo),
                        fill: false,
                        borderColor: '#4bc0c0'
                    },
                    {
                        label: 'Promedio',
                        data: this.intentos.map(() => promedio),
                        fill: false,
                        borderColor: '#565656',
                        borderDash: [5, 5]
                    }
                ]
            };

            this.options = {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'bottom'
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Intentos'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Tiempo (ms)'
                        },
                        ticks: {
                            beginAtZero: true,
                            callback: (value: number) => this.formatearTiempo(value)
                        }
                    }]
                }
            };
        } else {
            this.data = null;
        }
    }

    onSesionChange(event: any): void {
        const sesionId = event.target.value;
        this.selectedSesion = this.sesiones[sesionId - 1];
        if (this.selectedSesion) {
            this.cargarIntentos(this.selectedSesion.id);
        }
    }

    onPageChange(event: any): void {
        this.currentPage = event.page;
        this.paginateIntentos();
    }

    convertirMsAFormato(ms: number): string {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = Math.floor(ms % 1000 / 10);

        return `${minutes}:${this.pad(seconds)}.${this.pad(milliseconds)}`;
    }

    formatearTiempo(ms: number): string {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = Math.floor(ms % 1000 / 10); 

        return `${this.pad(minutes)}:${this.pad(seconds)}.${this.pad(milliseconds)}`;
    }

    pad(num: number): string {
        return num.toString().padStart(2, '0');
    }
}
