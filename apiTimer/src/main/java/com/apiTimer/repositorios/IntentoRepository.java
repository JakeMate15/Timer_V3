package com.apiTimer.repositorios;

import com.apiTimer.entidades.Intento;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IntentoRepository extends CrudRepository<Intento, Long> {
    List<Intento> findBySesionId(Long sesionId);
}
