package com.vidrieria.ServiceInventariado.application.mappers;

import com.vidrieria.ServiceInventariado.application.dto.MovimientoMaterialDTO;
import com.vidrieria.ServiceInventariado.domain.model.MovimientoMaterial;
import org.springframework.stereotype.Component;

@Component
public class MovimientoMaterialMapper {
    public MovimientoMaterialDTO toDTO(MovimientoMaterial entity) {
        if (entity == null) return null;
        MovimientoMaterialDTO dto = new MovimientoMaterialDTO();
        dto.setIdHistorial(entity.getIdHistorial());
        dto.setIdStockMaterial(entity.getIdStockMaterial());
        dto.setTipoMovimiento(entity.getTipoMovimiento());
        dto.setCantidadMovida(entity.getCantidadMovida());
        dto.setStockRestante(entity.getStockRestante());
        dto.setIdUsuarioResponsable(entity.getIdUsuarioResponsable());
        dto.setFechaMovimiento(entity.getFechaMovimiento());
        return dto;
    }
}