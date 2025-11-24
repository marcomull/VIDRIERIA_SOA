package com.vidrieria.ServiceInventariado.application.mappers;

import com.vidrieria.ServiceInventariado.application.dto.StockVidrioDTO;
import com.vidrieria.ServiceInventariado.domain.model.StockVidrio;
import org.springframework.stereotype.Component;

@Component
public class StockVidrioMapper {

    public StockVidrio toEntity(StockVidrioDTO dto) {
        if (dto == null) return null;
        StockVidrio entity = new StockVidrio();
        // No mapeamos el ID al crear uno nuevo
        entity.setIdVidrio(dto.getIdVidrio());
        entity.setEspesor(dto.getEspesor());
        entity.setAncho(dto.getAncho());
        entity.setAlto(dto.getAlto());
        entity.setCantidad(dto.getCantidad() != null ? dto.getCantidad() : 1);
        entity.setEsRetazo(dto.getEsRetazo() != null ? dto.getEsRetazo() : false);
        entity.setPrecioM2(dto.getPrecioM2());
        entity.setUbicacion(dto.getUbicacion());
        // fechaIngreso y activo se manejan en el servicio/entidad
        return entity;
    }

    public StockVidrioDTO toDTO(StockVidrio entity) {
        if (entity == null) return null;
        StockVidrioDTO dto = new StockVidrioDTO();
        dto.setIdStockVidrio(entity.getIdStockVidrio());
        dto.setIdVidrio(entity.getIdVidrio());
        dto.setEspesor(entity.getEspesor());
        dto.setAncho(entity.getAncho());
        dto.setAlto(entity.getAlto());
        dto.setCantidad(entity.getCantidad());
        dto.setEsRetazo(entity.getEsRetazo());
        dto.setPrecioM2(entity.getPrecioM2());
        dto.setUbicacion(entity.getUbicacion());
        dto.setFechaIngreso(entity.getFechaIngreso());
        dto.setActivo(entity.getActivo());
        return dto;
    }

    public void updateEntityFromDto(StockVidrioDTO dto, StockVidrio entity) {
        if (dto == null || entity == null) return;
        // Solo actualizamos campos modificables
        if (dto.getIdVidrio() != null) entity.setIdVidrio(dto.getIdVidrio());
        if (dto.getEspesor() != null) entity.setEspesor(dto.getEspesor());
        if (dto.getAncho() != null) entity.setAncho(dto.getAncho());
        if (dto.getAlto() != null) entity.setAlto(dto.getAlto());
        if (dto.getCantidad() != null) entity.setCantidad(dto.getCantidad());
        if (dto.getEsRetazo() != null) entity.setEsRetazo(dto.getEsRetazo());
        if (dto.getPrecioM2() != null) entity.setPrecioM2(dto.getPrecioM2());
        if (dto.getUbicacion() != null) entity.setUbicacion(dto.getUbicacion());
        // activo se maneja con soft delete
    }
}