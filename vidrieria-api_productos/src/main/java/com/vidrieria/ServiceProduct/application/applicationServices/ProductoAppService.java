package com.vidrieria.ServiceProduct.application.applicationServices;

import com.vidrieria.ServiceProduct.application.dto.ProductoDTO;
import com.vidrieria.ServiceProduct.application.mappers.ProductoMapper;
import com.vidrieria.ServiceProduct.domain.interfaceService.IProductoService;
import com.vidrieria.ServiceProduct.domain.model.Producto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductoAppService {

    @Autowired
    private IProductoService productoService;

    @Autowired
    private ProductoMapper productoMapper;

    // CREATE
    public Producto createProducto(ProductoDTO dto) {
        Producto producto = productoMapper.toEntity(dto);
        return productoService.save(producto);
    }

    // READ ALL con paginación y búsqueda
    public Page<Producto> findAll(Pageable pageable, String searchTerm) {
        if (searchTerm != null && !searchTerm.isEmpty()) {
            return productoService.findActivosByNombre(searchTerm, pageable);
        } else {
            return productoService.findAllActivos(pageable);
        }
    }

    // READ BY ID
    public Optional<Producto> findById(Integer id) {
        return productoService.findActivoById(id); //
    }

    // UPDATE
    public Optional<Producto> update(Integer id, ProductoDTO dto) {
        return productoService.findActivoById(id).map(existingProducto -> {
            productoMapper.updateEntityFromDto(dto, existingProducto);
            return productoService.save(existingProducto);
        });
    }

    // DELETE Soft Delete
    public boolean delete(Integer id) {
        return productoService.softDelete(id);
    }
}