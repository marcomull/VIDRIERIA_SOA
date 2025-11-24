package com.vidrieria.ServiceInventariado.domain.domainServices;

import com.vidrieria.ServiceInventariado.domain.interfaceService.IStockMaterialService;
import com.vidrieria.ServiceInventariado.domain.model.StockMaterial;
import com.vidrieria.ServiceInventariado.infrastructure.repository.IStockMaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StockMaterialService implements IStockMaterialService {

    @Autowired
    private IStockMaterialRepository repository;

    @Override
    public StockMaterial save(StockMaterial stockMaterial) {
        if (stockMaterial.getIdStockMaterial() == null) {
            stockMaterial.setFechaIngreso(LocalDateTime.now());
            stockMaterial.setActivo(true);
        }
        return repository.save(stockMaterial);
    }

    @Override
    public List<StockMaterial> findAllActive() {
        return repository.findAll().stream()
                .filter(sm -> sm.getActivo() == null || sm.getActivo())
                .collect(Collectors.toList());
    }

    @Override
    public Optional<StockMaterial> findActiveById(Integer id) {
        return repository.findByIdStockMaterialAndActivoTrue(id);
    }

    @Override
    public List<StockMaterial> findActiveByIdMaterial(Integer idMaterial) {
        // Asumiendo que quieres los que tienen cantidad > 0
        return repository.findByIdMaterialAndActivoTrueAndCantidadGreaterThan(idMaterial, 0);
    }

    @Override
    public boolean softDelete(Integer id) {
        return findActiveById(id).map(stock -> {
            stock.setActivo(false);
            repository.save(stock);
            return true;
        }).orElse(false);
    }

    @Override
    public List<StockMaterial> findLowStockItems(Integer umbral) {
        return repository.findLowStock(umbral);
    }
}