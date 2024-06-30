package com.apiTimer.controladores;

import com.apiTimer.entidades.Sesion;
import com.apiTimer.servicios.SesionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sesiones")
@CrossOrigin(origins = "http://localhost:4200")
public class SesionController {
    @Autowired
    private SesionService sesionService;

    @GetMapping
    public List<Sesion> findAll() {
        return sesionService.findAll();
    }

    @GetMapping("/{id}")
    public Sesion findById(@PathVariable Long id) {
        return sesionService.findById(id);
    }

    @PostMapping
    public Sesion save(@RequestBody Sesion sesion) {
        return sesionService.save(sesion);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        sesionService.deleteById(id);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Sesion> findByUsuarioId(@PathVariable Long usuarioId) {
        return sesionService.findByUsuarioId(usuarioId);
    }
}
