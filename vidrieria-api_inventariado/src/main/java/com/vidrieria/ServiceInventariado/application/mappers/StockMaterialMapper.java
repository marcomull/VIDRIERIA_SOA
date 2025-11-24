package com.vidrieria.ServiceInventariado.application.mappers;

import com.vidrieria.ServiceInventariado.application.dto.StockMaterialDTO;
import com.vidrieria.ServiceInventariado.domain.model.StockMaterial;
import org.springframework.stereotype.Component;

@Component
public class StockMaterialMapper {

    public StockMaterial toEntity(StockMaterialDTO dto) {
        if (dto == null) return null;
        StockMaterial entity = new StockMaterial();
        entity.setIdMaterial(dto.getIdMaterial());
        entity.setLargo(dto.getLargo());
        entity.setCantidad(dto.getCantidad() != null ? dto.getCantidad() : 1);
        entity.setEsRetazo(dto.getEsRetazo() != null ? dto.getEsRetazo() : false);
        entity.setPrecioMetro(dto.getPrecioMetro());
        entity.setUbicacion(dto.getUbicacion());
        return entity;
    }

    public StockMaterialDTO toDTO(StockMaterial entity) {
        if (entity == null) return null;
        StockMaterialDTO dto = new StockMaterialDTO();
        dto.setIdStockMaterial(entity.getIdStockMaterial());
        dto.setIdMaterial(entity.getIdMaterial());
        dto.setLargo(entity.getLargo());
        dto.setCantidad(entity.getCantidad());
        dto.setEsRetazo(entity.getEsRetazo());
        dto.setPrecioMetro(entity.getPrecioMetro());
        dto.setUbicacion(entity.getUbicacion());
        dto.setFechaIngreso(entity.getFechaIngreso());
        dto.setActivo(entity.getActivo());
        return dto;
    }

    public void updateEntityFromDto(StockMaterialDTO dto, StockMaterial entity) {
        if (dto == null || entity == null) return;
        if (dto.getIdMaterial() != null) entity.setIdMaterial(dto.getIdMaterial());
        if (dto.getLargo() != null) entity.setLargo(dto.getLargo());
        if (dto.getCantidad() != null) entity.setCantidad(dto.getCantidad());
        if (dto.getEsRetazo() != null) entity.setEsRetazo(dto.getEsRetazo());
        if (dto.getPrecioMetro() != null) entity.setPrecioMetro(dto.getPrecioMetro());
        if (dto.getUbicacion() != null) entity.setUbicacion(dto.getUbicacion());
    }
}
