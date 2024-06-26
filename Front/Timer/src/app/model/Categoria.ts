import { Sesion } from './Sesion';

export class Categoria {
    id: number;
    nombre: string;
    sesiones: Sesion[];

    constructor(id: number, nombre: string, sesiones: Sesion[]) {
        this.id = id;
        this.nombre = nombre;
        this.sesiones = sesiones;
    }
}
