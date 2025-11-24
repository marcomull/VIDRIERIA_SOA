package com.vidrieria.ServiceProduct.application.mappers;

import com.vidrieria.ServiceProduct.application.dto.TipoVidrioDTO;
import com.vidrieria.ServiceProduct.domain.model.TipoVidrio;
import org.springframework.stereotype.Component;

@Component
public class TipoVidrioMapper {

    public TipoVidrio toEntity(TipoVidrioDTO dto) {
        if (dto == null) {
            return null;
        }
        TipoVidrio tipoVidrio = new TipoVidrio();
        tipoVidrio.setNombre(dto.getNombre());
        tipoVidrio.setDescripcion(dto.getDescripcion());
        tipoVidrio.setImagenUrl(dto.getImagenUrl());
        return tipoVidrio;
    }

    public void updateEntityFromDto(TipoVidrioDTO dto, TipoVidrio entity) {
        entity.setNombre(dto.getNombre());
        entity.setDescripcion(dto.getDescripcion());
        entity.setImagenUrl(dto.getImagenUrl());
    }
}