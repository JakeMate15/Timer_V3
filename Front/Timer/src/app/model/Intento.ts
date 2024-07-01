import { Sesion } from './Sesion';
import { Categoria } from './Categoria';

export class Intento {
    id: number;
    fecha: string;
    tiempo: number;
    sesion: Sesion;
    categoria: Categoria;

    constructor(
        id: number = 0,
        fecha: string = '',
        tiempo: number = 0,
        sesion: Sesion = new Sesion(),
        categoria: Categoria = new Categoria()
    ) {
        this.id = id;
        this.fecha = fecha;
        this.tiempo = tiempo;
        this.sesion = sesion;
        this.categoria = categoria;
    }
}