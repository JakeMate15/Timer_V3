package com.apiTimer.servicios;

import com.apiTimer.entidades.Intento;
import com.apiTimer.repositorios.IntentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class IntentoService {
    @Autowired
    private IntentoRepository intentoRepository;

    public List<Intento> findAll() {
        List<Intento> intentos = new ArrayList<>();
        intentoRepository.findAll().forEach(intentos::add);
        return intentos;
    }

    public Intento findById(Long id) {
        Optional<Intento> intento = intentoRepository.findById(id);
        return intento.orElse(null);
    }

    public List<Intento> findBySesionId(Long sesionId) {
        return intentoRepository.findBySesionId(sesionId);
    }

    public Intento save(Intento intento) {
        return intentoRepository.save(intento);
    }

    public void deleteById(Long id) {
        intentoRepository.deleteById(id);
    }
}
