package com.apiTimer.repositorios;

import com.apiTimer.entidades.Intento;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IntentoRepository extends CrudRepository<Intento, Long> {
}
