package com.vidrieria.ServiceProduct.domain.interfaceService;

import com.vidrieria.ServiceProduct.domain.model.Producto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface IProductoService {
    Producto save(Producto producto);
    Page<Producto> findAllActivos(Pageable pageable);
    Page<Producto> findActivosByNombre(String nombre, Pageable pageable);
    Optional<Producto> findActivoById(Integer Id);
    boolean softDelete(Integer Id);
}