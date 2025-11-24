package com.vidrieria.ServiceInventariado.domain.interfaceService;

import com.vidrieria.ServiceInventariado.domain.model.StockVidrio;
import java.util.List;
import java.util.Optional;

public interface IStockVidrioService {
    StockVidrio save(StockVidrio stockVidrio);
    List<StockVidrio> findAllActive();
    Optional<StockVidrio> findActiveById(Integer id);
    List<StockVidrio> findActiveByIdVidrio(Integer idVidrio);
    boolean softDelete(Integer id);
    List<StockVidrio> findLowStockItems(Integer umbral); // Para notificaciones
}