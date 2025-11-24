package com.vidrieria.ServiceProduct.application.mappers;

import com.vidrieria.ServiceProduct.application.dto.MaterialDTO;
import com.vidrieria.ServiceProduct.domain.model.Material;
import org.springframework.stereotype.Component;

@Component
public class MaterialMapper {

    public Material toEntity(MaterialDTO dto) {
        if (dto == null) {
            return null;
        }
        Material material = new Material();
        material.setNombre(dto.getNombre());
        material.setDescripcion(dto.getDescripcion());
        material.setTipoMaterial(dto.getTipoMaterial());
        material.setImagenUrl(dto.getImagenUrl());
        return material;
    }

    public void updateEntityFromDto(MaterialDTO dto, Material entity) {
        entity.setNombre(dto.getNombre());
        entity.setDescripcion(dto.getDescripcion());
        entity.setTipoMaterial(dto.getTipoMaterial());
        entity.setImagenUrl(dto.getImagenUrl());
    }
}