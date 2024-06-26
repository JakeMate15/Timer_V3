package com.apiTimer.controladores;

import com.apiTimer.entidades.Usuario;
import com.apiTimer.servicios.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody Usuario loginRequest) {
        Usuario usuario = usuarioService.findByUsuario(loginRequest.getUsuario());
        if (usuario != null && usuario.getContrasena().equals(loginRequest.getContrasena())) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Usuario> register(@RequestBody Usuario newUser) {
        Usuario existingUser = usuarioService.findByUsuario(newUser.getUsuario());
        if (existingUser != null) {
            return ResponseEntity.status(409).build(); // Conflict
        } else {
            Usuario savedUser = usuarioService.save(newUser);
            return ResponseEntity.ok(savedUser);
        }
    }
}
