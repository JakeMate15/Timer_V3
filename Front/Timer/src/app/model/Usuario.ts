import { Sesion } from "./Sesion";

export class Usuario {
    id: number;
    usuario: string;
    contrasena: string;
    correo: string;
    nombre: string;
    sesiones: Sesion[];
    amigos: Usuario[];

    constructor(
        id: number,
        usuario: string,
        contrasena: string,
        correo: string,
        nombre: string,
        sesiones: Sesion[] = [],
        amigos: Usuario[] = []
    ) {
        this.id = id;
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.correo = correo;
        this.nombre = nombre;
        this.sesiones = sesiones;
        this.amigos = amigos;
    }
}
