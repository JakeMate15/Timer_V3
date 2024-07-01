package com.apiTimer.controladores;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/rankings")
@CrossOrigin(origins = "http://localhost:4200")
public class RankingsController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/records")
    public List<Map<String, Object>> getRecords() {
        String sql = "SELECT " +
                "Intentos.id AS intento_id, " +
                "Intentos.fecha, " +
                "Intentos.tiempo, " +
                "Categoria.nombre AS categoria_nombre, " +
                "Usuarios.id AS usuario_id, " +
                "Usuarios.usuario AS nombre_usuario, " +
                "Usuarios.nombre AS nombre_completo " +
                "FROM Intentos " +
                "INNER JOIN Sesiones ON Intentos.sesion_id = Sesiones.id " +
                "INNER JOIN Categoria ON Intentos.categoria_id = Categoria.id " +
                "INNER JOIN Usuarios ON Sesiones.usuario_id = Usuarios.id " +
                "INNER JOIN ( " +
                "    SELECT " +
                "        categoria_id, " +
                "        MIN(tiempo) AS mejor_tiempo " +
                "    FROM Intentos " +
                "    GROUP BY categoria_id " +
                ") AS MejoresIntentos " +
                "ON Intentos.categoria_id = MejoresIntentos.categoria_id " +
                "AND Intentos.tiempo = MejoresIntentos.mejor_tiempo";

        return jdbcTemplate.queryForList(sql);
    }
}
