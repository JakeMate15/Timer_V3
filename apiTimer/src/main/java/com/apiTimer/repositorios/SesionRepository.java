package com.apiTimer.repositorios;

import com.apiTimer.entidades.Sesion;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SesionRepository extends CrudRepository<Sesion, Long> {
    List<Sesion> findByUsuarioId(Long usuarioId);
}
