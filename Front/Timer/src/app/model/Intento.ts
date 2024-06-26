import { Sesion } from "./Sesion";

export class Intento {
    id: number;
    fecha: Date;
    tiempo: number; // en milisegundos
    sesion: Sesion;

    constructor(id: number, fecha: Date, tiempo: number, sesion: Sesion) {
        this.id = id;
        this.fecha = fecha;
        this.tiempo = tiempo;
        this.sesion = sesion;
    }
}
