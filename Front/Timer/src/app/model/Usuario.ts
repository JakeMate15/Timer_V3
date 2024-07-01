import { Sesion } from "./Sesion";

export class Usuario {
    id: number;
    usuario: string;
    contrasena: string;
    correo: string;
    nombre: string;
    amigos: Usuario[];

    constructor(
        id: number = 0,
        usuario: string = '',
        contrasena: string = '',
        correo: string = '',
        nombre: string = '',
        amigos: Usuario[] = []
    ) {
        this.id = id;
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.correo = correo;
        this.nombre = nombre;
        this.amigos = amigos;
    }
}
