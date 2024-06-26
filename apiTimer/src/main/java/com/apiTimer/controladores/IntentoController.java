package com.apiTimer.controladores;

import com.apiTimer.entidades.Intento;
import com.apiTimer.servicios.IntentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/intentos")
public class IntentoController {
    @Autowired
    private IntentoService intentoService;

    @GetMapping
    public List<Intento> findAll() {
        return intentoService.findAll();
    }

    @GetMapping("/{id}")
    public Intento findById(@PathVariable Long id) {
        return intentoService.findById(id);
    }

    @PostMapping
    public Intento save(@RequestBody Intento intento) {
        return intentoService.save(intento);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        intentoService.deleteById(id);
    }
}
