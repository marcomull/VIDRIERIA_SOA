package com.vidrieria.ServiceInventariado.domain.domainServices;

import com.vidrieria.ServiceInventariado.domain.interfaceService.IStockVidrioService;
import com.vidrieria.ServiceInventariado.domain.model.StockVidrio;
import com.vidrieria.ServiceInventariado.infrastructure.repository.IStockVidrioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StockVidrioService implements IStockVidrioService {

    @Autowired
    private IStockVidrioRepository repository;

    @Override
    public StockVidrio save(StockVidrio stockVidrio) {
        if (stockVidrio.getIdStockVidrio() == null) { // Es nuevo
            stockVidrio.setFechaIngreso(LocalDateTime.now());
            stockVidrio.setActivo(true);
        }
        return repository.save(stockVidrio);
    }

    @Override
    public List<StockVidrio> findAllActive() {
        return repository.findAll().stream()
                .filter(sv -> sv.getActivo() == null || sv.getActivo())
                .collect(Collectors.toList());
    }

    @Override
    public Optional<StockVidrio> findActiveById(Integer id) {
        return repository.findByIdStockVidrioAndActivoTrue(id);
    }

    @Override
    public List<StockVidrio> findActiveByIdVidrio(Integer idVidrio) {
        return repository.findByIdVidrioAndActivoTrue(idVidrio);
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
    public List<StockVidrio> findLowStockItems(Integer umbral) {
        return repository.findLowStock(umbral);
    }
}