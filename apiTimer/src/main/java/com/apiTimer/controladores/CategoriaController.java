package com.apiTimer.controladores;

import com.apiTimer.entidades.Categoria;
import com.apiTimer.servicios.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoriaController {
    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public List<Categoria> findAll() {
        return categoriaService.findAll();
    }

    @GetMapping("/{id}")
    public Categoria findById(@PathVariable Long id) {
        return categoriaService.findById(id);
    }

    @PostMapping
    public Categoria save(@RequestBody Categoria categoria) {
        return categoriaService.save(categoria);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        categoriaService.deleteById(id);
    }
}
