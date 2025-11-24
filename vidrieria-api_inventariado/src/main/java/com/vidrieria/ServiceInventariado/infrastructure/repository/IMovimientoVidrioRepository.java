package com.vidrieria.ServiceInventariado.infrastructure.repository;

import com.vidrieria.ServiceInventariado.domain.model.MovimientoVidrio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IMovimientoVidrioRepository extends JpaRepository<MovimientoVidrio, Integer> {
    List<MovimientoVidrio> findByIdStockVidrioOrderByIdHistorialDesc(Integer idStockVidrio);
}