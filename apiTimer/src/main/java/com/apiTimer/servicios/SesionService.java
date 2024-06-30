package com.apiTimer.servicios;

import com.apiTimer.entidades.Sesion;
import com.apiTimer.repositorios.SesionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SesionService {
    @Autowired
    private SesionRepository sesionRepository;

    public List<Sesion> findAll() {
        List<Sesion> sesiones = new ArrayList<>();
        sesionRepository.findAll().forEach(sesiones::add);
        return sesiones;
    }

    public Sesion findById(Long id) {
        Optional<Sesion> sesion = sesionRepository.findById(id);
        return sesion.orElse(null);
    }

    public Sesion save(Sesion sesion) {
        return sesionRepository.save(sesion);
    }

    public void deleteById(Long id) {
        sesionRepository.deleteById(id);
    }

    public List<Sesion> findByUsuarioId(Long usuarioId) {
        return sesionRepository.findByUsuarioId(usuarioId);
    }
}
