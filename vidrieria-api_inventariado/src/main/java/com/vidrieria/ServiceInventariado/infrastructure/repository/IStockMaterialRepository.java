package com.vidrieria.ServiceInventariado.infrastructure.repository;

import com.vidrieria.ServiceInventariado.domain.model.StockMaterial; // Asegúrate que el import sea correcto
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

@Repository
public interface IStockMaterialRepository extends JpaRepository<StockMaterial, Integer> {

    List<StockMaterial> findByIdMaterialAndActivoTrueAndCantidadGreaterThan(Integer idMaterial, Integer cantidad);

    @Query("SELECT sm FROM StockMaterial sm WHERE sm.idMaterial = :idMaterial AND sm.largo >= :largoRequerido AND sm.cantidad > 0 AND sm.activo = true ORDER BY sm.esRetazo DESC, sm.largo ASC")
    List<StockMaterial> findBestFitMaterial(
            @Param("idMaterial") Integer idMaterial,
            @Param("largoRequerido") Double largoRequerido
    );

    Optional<StockMaterial> findByIdStockMaterialAndActivoTrue(Integer idStockMaterial);

    @Query("SELECT sm FROM StockMaterial sm WHERE sm.activo = true AND sm.cantidad <= :umbral")
    List<StockMaterial> findLowStock(@Param("umbral") Integer umbral);
}