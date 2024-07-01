package com.apiTimer.controladores;

import com.apiTimer.entidades.Intento;
import com.apiTimer.servicios.IntentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/intentos")
@CrossOrigin(origins = "http://localhost:4200")
public class IntentoController {

    @Autowired
    private IntentoService intentoService;

    @GetMapping
    public List<Intento> findAll() {
        return intentoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Intento> findById(@PathVariable Long id) {
        Intento intento = intentoService.findById(id);
        if (intento != null) {
            return ResponseEntity.ok(intento);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/sesion/{sesionId}")
    public List<Intento> findBySesionId(@PathVariable Long sesionId) {
        return intentoService.findBySesionId(sesionId);
    }

    @PostMapping
    public Intento save(@RequestBody Intento intento) {
        return intentoService.save(intento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Intento> update(@PathVariable Long id, @RequestBody Intento intento) {
        Intento existingIntento = intentoService.findById(id);
        if (existingIntento != null) {
            intento.setId(id);
            Intento updatedIntento = intentoService.save(intento);
            return ResponseEntity.ok(updatedIntento);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        Intento existingIntento = intentoService.findById(id);
        if (existingIntento != null) {
            intentoService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
