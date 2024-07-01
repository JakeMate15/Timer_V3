import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RankingsService } from '../servicios/rankings-service.service';

@Component({
  selector: 'app-rankings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rankings.component.html',
  styleUrl: './rankings.component.css'
})
export class RankingsComponent {
    records: any[] = [];

    constructor(private rankingService: RankingsService) {}

    ngOnInit(): void {
        this.getRecords();
    }
    
    getRecords(): void {
        this.rankingService.getRecords().subscribe(data => {
            this.records = data;
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
