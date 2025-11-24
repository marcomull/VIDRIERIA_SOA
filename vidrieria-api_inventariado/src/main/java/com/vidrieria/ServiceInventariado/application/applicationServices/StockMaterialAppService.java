package com.vidrieria.ServiceInventariado.application.applicationServices;

import com.vidrieria.ServiceInventariado.application.dto.StockMaterialDTO;
import com.vidrieria.ServiceInventariado.application.mappers.StockMaterialMapper;
import com.vidrieria.ServiceInventariado.domain.interfaceService.IHistorialService;
import com.vidrieria.ServiceInventariado.domain.interfaceService.IStockMaterialService;
import com.vidrieria.ServiceInventariado.domain.model.StockMaterial;
import com.vidrieria.ServiceInventariado.domain.model.TipoMovimiento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StockMaterialAppService {

    @Autowired
    private IStockMaterialService stockMaterialService;

    @Autowired
    private StockMaterialMapper mapper;

    @Autowired
    private IHistorialService historialService;

    @Transactional
    public StockMaterialDTO createStock(StockMaterialDTO dto){
        StockMaterial entity = mapper.toEntity(dto);
        StockMaterial savedEntity = stockMaterialService.save(entity);
        historialService.registrarMovimientoMaterial(
                savedEntity,
                TipoMovimiento.INGRESO_MANUAL,
                savedEntity.getCantidad()
        );
        return mapper.toDTO(savedEntity);
    }

    public List<StockMaterialDTO> getAllStock() {
        return stockMaterialService.findAllActive().stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<StockMaterialDTO> getStockById(Integer id) {
        return stockMaterialService.findActiveById(id).map(mapper::toDTO);
    }

    public List<StockMaterialDTO> getStockByIdMaterial(Integer idMaterial) {
        return stockMaterialService.findActiveByIdMaterial(idMaterial).stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public Optional<StockMaterialDTO> updateStock(Integer id, StockMaterialDTO dto){
        return stockMaterialService.findActiveById(id).map(existingEntity -> {

            int cantidadAntigua = existingEntity.getCantidad();

            mapper.updateEntityFromDto(dto, existingEntity);
            StockMaterial updatedEntity = stockMaterialService.save(existingEntity);

            int cantidadNueva = updatedEntity.getCantidad();
            int cantidadMovida = cantidadNueva - cantidadAntigua;

            if (cantidadMovida != 0) {
                historialService.registrarMovimientoMaterial(
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
        Optional<StockMaterial> entityOpt = stockMaterialService.findActiveById(id);
        if (entityOpt.isEmpty()) {
            return false;
        }
        StockMaterial entity = entityOpt.get();
        int cantidadActual = entity.getCantidad();

        boolean deleted = stockMaterialService.softDelete(id);

        if (deleted) {
            entity.setCantidad(0);
            historialService.registrarMovimientoMaterial(
                    entity,
                    TipoMovimiento.BAJA_POR_ROTURA,
                    -cantidadActual
            );
        }
        return deleted;
    }
}