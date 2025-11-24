package com.vidrieria.ServiceInventariado.application.mappers;

import com.vidrieria.ServiceInventariado.application.dto.MovimientoVidrioDTO;
import com.vidrieria.ServiceInventariado.domain.model.MovimientoVidrio;
import org.springframework.stereotype.Component;

@Component
public class MovimientoVidrioMapper {
    public MovimientoVidrioDTO toDTO(MovimientoVidrio entity) {
        if (entity == null) return null;
        MovimientoVidrioDTO dto = new MovimientoVidrioDTO();
        dto.setIdHistorial(entity.getIdHistorial());
        dto.setIdStockVidrio(entity.getIdStockVidrio());
        dto.setTipoMovimiento(entity.getTipoMovimiento());
        dto.setCantidadMovida(entity.getCantidadMovida());
        dto.setStockRestante(entity.getStockRestante());
        dto.setIdUsuarioResponsable(entity.getIdUsuarioResponsable());
        dto.setFechaMovimiento(entity.getFechaMovimiento());
        return dto;
    }
}