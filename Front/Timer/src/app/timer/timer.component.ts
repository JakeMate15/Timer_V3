import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../model/Categoria';
import { CommonModule } from '@angular/common';
import { CategoriasService } from '../servicios/categorias.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})

export class TimerComponent {
    currentUser: Usuario | null = null;
    categorias: Categoria[] = [];
    selectedCategoria: string = '';
    categoriaElegida: string = 'wca';

    constructor (private categoriaService: CategoriasService, private authService: AuthService) {}

    ngOnInit(): void {
        this.currentUser = this.authService.getCurrentUser();
        console.log(Usuario.toString())
        this.categoriaService.getCategorias().subscribe(data => {
            this.categorias = data;
        });
    }

    onCategoriaChange(value: string) {
        this.categoriaElegida = value;
    }

}
