package com.apiTimer.controladores;

import com.apiTimer.entidades.Usuario;
import com.apiTimer.servicios.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> findAll() {
        return usuarioService.findAll();
    }

    @GetMapping("/{id}")
    public Usuario findById(@PathVariable Long id) {
        return usuarioService.findById(id);
    }

    @GetMapping("/buscar")
    public Usuario findByUsuario(@RequestParam String usuario) {
        return usuarioService.findByUsuario(usuario);
    }

    @PostMapping
    public Usuario save(@RequestBody Usuario usuario) {
        return usuarioService.save(usuario);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        usuarioService.deleteById(id);
    }

    @PostMapping("/{userId}/amigos/{friendId}")
    public Usuario addFriend(@PathVariable Long userId, @PathVariable Long friendId) {
        return usuarioService.addFriend(userId, friendId);
    }

    @DeleteMapping("/{userId}/amigos/{friendId}")
    public Usuario removeFriend(@PathVariable Long userId, @PathVariable Long friendId) {
        return usuarioService.removeFriend(userId, friendId);
    }
}
