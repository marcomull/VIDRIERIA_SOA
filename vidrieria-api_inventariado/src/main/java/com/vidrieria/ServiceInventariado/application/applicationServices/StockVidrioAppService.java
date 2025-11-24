package com.vidrieria.ServiceInventariado.application.applicationServices;

import com.vidrieria.ServiceInventariado.application.dto.StockVidrioDTO;
import com.vidrieria.ServiceInventariado.application.mappers.StockVidrioMapper;
import com.vidrieria.ServiceInventariado.domain.interfaceService.IHistorialService;
import com.vidrieria.ServiceInventariado.domain.interfaceService.IStockVidrioService;
import com.vidrieria.ServiceInventariado.domain.model.StockVidrio;
import com.vidrieria.ServiceInventariado.domain.model.TipoMovimiento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StockVidrioAppService {

    @Autowired
    private IStockVidrioService stockVidrioService;

    @Autowired
    private StockVidrioMapper mapper;

    @Autowired
    private IHistorialService historialService;

    @Transactional
    public StockVidrioDTO createStock(StockVidrioDTO dto){
        StockVidrio entity = mapper.toEntity(dto);
        StockVidrio savedEntity = stockVidrioService.save(entity);
        historialService.registrarMovimientoVidrio(
                savedEntity,
                TipoMovimiento.INGRESO_MANUAL,
                savedEntity.getCantidad()
        );
        return mapper.toDTO(savedEntity);
    }

    public List<StockVidrioDTO> getAllStock() {
        return stockVidrioService.findAllActive().stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<StockVidrioDTO> getStockById(Integer id) {
        return stockVidrioService.findActiveById(id).map(mapper::toDTO);
    }

    public List<StockVidrioDTO> getStockByIdVidrio(Integer idVidrio) {
        return stockVidrioService.findActiveByIdVidrio(idVidrio).stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }


    @Transactional
    public Optional<StockVidrioDTO> updateStock(Integer id, StockVidrioDTO dto){
        return stockVidrioService.findActiveById(id).map(existingEntity -> {

            int cantidadAntigua = existingEntity.getCantidad();

            mapper.updateEntityFromDto(dto, existingEntity);
            StockVidrio updatedEntity = stockVidrioService.save(existingEntity);

            int cantidadNueva = updatedEntity.getCantidad();
            int cantidadMovida = cantidadNueva - cantidadAntigua;

            if (cantidadMovida != 0) {
                historialService.registrarMovimientoVidrio(
                        updatedEntity,
                        TipoMovimiento.AJUSTE_MANUAL,
                        cantidadMovida
                );
            }

            return mapper.toDTO(updatedEntity);
        });
    }

    @Transactional
    public boolean deleteStock(Integer id) {
        Optional<StockVidrio> entityOpt = stockVidrioService.findActiveById(id);
        if (entityOpt.isEmpty()) {
            return false;
        }
        StockVidrio entity = entityOpt.get();
        int cantidadActual = entity.getCantidad();

        boolean deleted = stockVidrioService.softDelete(id);

        if (deleted) {
            entity.setCantidad(0); // Forzamos a 0 para el historial
            historialService.registrarMovimientoVidrio(
                    entity,
                    TipoMovimiento.BAJA_POR_ROTURA,
                    -cantidadActual // Registra la cantidad total que se dio de baja
            );
        }
        return deleted;
    }
}