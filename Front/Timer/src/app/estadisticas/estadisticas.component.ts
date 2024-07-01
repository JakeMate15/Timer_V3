import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { Sesion } from '../model/Sesion';
import { Intento } from '../model/Intento';
import { SesionesService } from '../servicios/sesiones.service';
import { IntentosService } from '../servicios/intentos.service';

@Component({
    selector: 'app-estadisticas',
    standalone: true,
    imports: [CommonModule, FormsModule, CarouselModule, ChartModule],
    templateUrl: './estadisticas.component.html',
    styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
    sesiones: Sesion[] = [];
    selectedSesion: Sesion | null = null;
    intentos: Intento[] = [];
    paginatedIntentos: Intento[] = [];
    currentPage: number = 0;
    itemsPerPage: number = 10;
    promedioGeneral: number = 0;
    data: any;
    options: any;

    constructor(
        private sesionService: SesionesService,
        private intentoService: IntentosService
    ) {}

    ngOnInit(): void {
        this.sesionService.getSesiones().subscribe(sesiones => {
            this.sesiones = sesiones;
            if (this.sesiones.length > 0) {
                this.selectedSesion = this.sesiones[0];
                this.cargarIntentos(this.selectedSesion.id);
            }
        });
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
            this.promedioGeneral = total / this.intentos.length;
        } else {
            this.promedioGeneral = 0;
        }
    }

    cargarGrafica(): void {
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
                    data: this.intentos.map(() => this.promedioGeneral),
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
                        beginAtZero: true
                    }
                }]
            }
        };
    }

    onSesionChange(event: any): void {
        const sesionId = event.target.value;
        this.selectedSesion = this.sesiones.find(s => s.id === sesionId) || null;
        if (this.selectedSesion) {
            this.cargarIntentos(this.selectedSesion.id);
        }
    }

    onPageChange(event: any): void {
        this.currentPage = event.page;
        this.paginateIntentos();
    }
}
