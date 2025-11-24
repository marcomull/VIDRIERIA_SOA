package com.vidrieria.ServiceProduct.application.mappers;

import com.vidrieria.ServiceProduct.application.dto.ProductoDTO;
import com.vidrieria.ServiceProduct.domain.model.Producto;
import org.springframework.stereotype.Component;

@Component
public class ProductoMapper {

    public Producto toEntity(ProductoDTO dto) {
        Producto producto = new Producto();
        producto.setNombre(dto.getNombre());
        producto.setDescripcion(dto.getDescripcion());
        if (dto.getTipo() != null) {
            producto.setTipo(Producto.Tipo.valueOf(dto.getTipo().toUpperCase()));
        }
        producto.setImagenUrl(dto.getImagenUrl());
        return producto;
    }

    public void updateEntityFromDto(ProductoDTO dto, Producto entity) {
        entity.setNombre(dto.getNombre());
        entity.setDescripcion(dto.getDescripcion());
        if (dto.getTipo() != null) {
            entity.setTipo(Producto.Tipo.valueOf(dto.getTipo().toUpperCase()));
        }
        entity.setImagenUrl(dto.getImagenUrl());
    }
}