import { Categoria } from './Categoria';
import { Intento } from './Intento';
import { Usuario } from './usuario';

export class Sesion {
    id: number;
    nombre: string;
    categoria: Categoria;
    usuario: Usuario;
    intentos: Intento[];

    constructor(id: number, nombre: string, categoria: Categoria, usuario: Usuario, intentos: Intento[]) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.usuario = usuario;
        this.intentos = intentos;
    }
}
