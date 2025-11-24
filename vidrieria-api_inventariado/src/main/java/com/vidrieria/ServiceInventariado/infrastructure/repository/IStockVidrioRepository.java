package com.vidrieria.ServiceInventariado.infrastructure.repository;

import com.vidrieria.ServiceInventariado.domain.model.StockVidrio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IStockVidrioRepository extends JpaRepository<StockVidrio, Integer> {

    // Encontrar stock activo por ID de tipo de vidrio
    List<StockVidrio> findByIdVidrioAndActivoTrue(Integer idVidrio);

    // Encontrar un item específico por su ID de stock (para actualizar/borrar)
    Optional<StockVidrio> findByIdStockVidrioAndActivoTrue(Integer idStockVidrio);

    // Query para encontrar vidrios con cantidad baja (para notificaciones)
    @Query("SELECT sv FROM StockVidrio sv WHERE sv.activo = true AND sv.cantidad <= :umbral")
    List<StockVidrio> findLowStock(@Param("umbral") Integer umbral);
}