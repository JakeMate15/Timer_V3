import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RankingsService } from '../servicios/rankings-service.service';
import { AuthService } from '../servicios/auth.service';
import { AmigosService } from '../servicios/amigos-service.service';

@Component({
  selector: 'app-rankings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rankings.component.html',
  styleUrl: './rankings.component.css'
})
export class RankingsComponent {
    records: any[] = [];
    personalRecords: any[] = [];
    amigos: any[] = [];
    amigoRecords: any[] = [];
    currentUser: any;
    selectedAmigoId: number | null = null;

    constructor(
        private rankingsService: RankingsService,
        private authService: AuthService,
        private amigosService: AmigosService
    ) {}

    ngOnInit(): void {
        this.currentUser = this.authService.getCurrentUser();
        if (this.currentUser) {
            this.getRecords();
            this.getPersonalRecords(this.currentUser.id);
            this.obtenerAmigos();
        }
    }
    
    getRecords(): void {
        this.rankingsService.getRecords().subscribe(data => {
            this.records = data;
        });
    }

    getPersonalRecords(userId: number): void {
        this.rankingsService.getPersonalRecords(userId).subscribe(data => {
          this.personalRecords = data;
        });
    }

    obtenerAmigos(): void {
        this.amigosService.obtenerAmigos(this.currentUser.id).subscribe(amigos => {
            this.amigos = amigos;
        });
    }

    onAmigoChange(event: any): void {
        this.selectedAmigoId = event.target.value;
        if (this.selectedAmigoId) {
            this.getAmigoRecords(this.selectedAmigoId);
        }
    }

    getAmigoRecords(amigoId: number): void {
        this.rankingsService.getPersonalRecords(amigoId).subscribe(data => {
            this.amigoRecords = data;
        });
    }
    
    convertirTiempo(ms: number): string {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = Math.floor((ms % 1000) / 10); 
    
        return `${this.pad(minutes)}:${this.pad(seconds)}.${this.pad(milliseconds)}`;
    }
    
    pad(num: number): string {
        return num.toString().padStart(2, '0');
    }
}
