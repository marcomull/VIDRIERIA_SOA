package com.vidrieria.ServiceInventariado.domain.interfaceService;

import com.vidrieria.ServiceInventariado.domain.model.StockMaterial;
import java.util.List;
import java.util.Optional;

public interface IStockMaterialService {
    StockMaterial save(StockMaterial stockMaterial);
    List<StockMaterial> findAllActive();
    Optional<StockMaterial> findActiveById(Integer id);
    List<StockMaterial> findActiveByIdMaterial(Integer idMaterial);
    boolean softDelete(Integer id);
    List<StockMaterial> findLowStockItems(Integer umbral); // Para notificaciones
}