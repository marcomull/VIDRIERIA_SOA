package com.vidrieria.ServiceInventariado.infrastructure.repository;

import com.vidrieria.ServiceInventariado.domain.model.MovimientoMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IMovimientoMaterialRepository extends JpaRepository<MovimientoMaterial, Integer> {
    List<MovimientoMaterial> findByIdStockMaterialOrderByIdHistorialDesc(Integer idStockMaterial);
}