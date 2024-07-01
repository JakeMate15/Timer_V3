package com.apiTimer.entidades;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "usuarios")
@JsonIgnoreProperties({"sesiones", "amigosDe"}) // Ignorar propiedades que pueden causar referencias recursivas
public class Usuario implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String usuario;

    @Column(nullable = false, length = 50)
    private String contrasena;

    @Column(nullable = false, length = 100)
    private String correo;

    @Column(nullable = false, length = 255)
    private String nombre;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("usuario")
    private Set<Sesion> sesiones = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "amigos",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "amigo_id")
    )
    @JsonIgnoreProperties("amigos")
    private Set<Usuario> amigos = new HashSet<>();

    @ManyToMany(mappedBy = "amigos")
    @JsonIgnoreProperties("amigosDe")
    private Set<Usuario> amigosDe = new HashSet<>();

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Set<Sesion> getSesiones() {
        return sesiones;
    }

    public void setSesiones(Set<Sesion> sesiones) {
        this.sesiones = sesiones;
    }

    public Set<Usuario> getAmigos() {
        return amigos;
    }

    public void setAmigos(Set<Usuario> amigos) {
        this.amigos = amigos;
    }

    public Set<Usuario> getAmigosDe() {
        return amigosDe;
    }

    public void setAmigosDe(Set<Usuario> amigosDe) {
        this.amigosDe = amigosDe;
    }
}
