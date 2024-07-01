import { Sesion } from './Sesion';
import { Categoria } from './Categoria';

export class Intento {
    id: number;
    fecha: string; 
    tiempo: number
    sesion: Sesion;
    categoria: Categoria;

    constructor(id: number, fecha: string, tiempo: number, sesion: Sesion, categoria: Categoria) {
        this.id = id;
        this.fecha = fecha;
        this.tiempo = tiempo;
        this.sesion = sesion;
        this.categoria = categoria;
    }
}
