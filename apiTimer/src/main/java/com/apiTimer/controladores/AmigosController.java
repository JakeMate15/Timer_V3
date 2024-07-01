package com.apiTimer.controladores;

import com.apiTimer.entidades.Usuario;
import com.apiTimer.servicios.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/amigos")
@CrossOrigin(origins = "http://localhost:4200")
public class AmigosController {
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/buscar/{username}")
    public ResponseEntity<Usuario> buscarUsuario(@PathVariable String username) {
        Usuario usuario = usuarioService.findByUsuario(username);
        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/agregar")
    public ResponseEntity<Void> agregarAmigo(@RequestBody Map<String, Long> payload) {
        Long userId = payload.get("userId");
        Long amigoId = payload.get("amigoId");
        usuarioService.addFriend(userId, amigoId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/lista/{userId}")
    public List<Usuario> obtenerAmigos(@PathVariable Long userId) {
        return usuarioService.obtenerAmigos(userId);
    }

    @DeleteMapping("/eliminar/{userId}/{amigoId}")
    public ResponseEntity<Void> eliminarAmigo(@PathVariable Long userId, @PathVariable Long amigoId) {
        usuarioService.removeFriend(userId, amigoId);
        return ResponseEntity.ok().build();
    }
}
