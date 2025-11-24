package com.vidrieria.ServiceProduct.domain.domainServices;

import com.vidrieria.ServiceProduct.domain.interfaceService.IProductoService;
import com.vidrieria.ServiceProduct.domain.model.Producto;
import com.vidrieria.ServiceProduct.infrastructure.repository.IProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductoService implements IProductoService {

    @Autowired
    private IProductoRepository productoRepository;

    @Override
    public Producto save(Producto producto) {
        if (producto.getIdProducto() == null) {
            producto.setActivo(true);
        }
        return productoRepository.save(producto);
    }

    @Override
    public Page<Producto> findAllActivos(Pageable pageable) {
        return productoRepository.findAllByActivoTrue(pageable);
    }

    @Override
    public Page<Producto> findActivosByNombre(String nombre, Pageable pageable) {
        return productoRepository.findByNombreContainingIgnoreCaseAndActivoTrue(nombre, pageable);
    }

    @Override
    public Optional<Producto> findActivoById(Integer id) {
        return productoRepository.findByIdProductoAndActivoTrue(id);
    }

    @Override
    public boolean softDelete(Integer id) {
        return productoRepository.findByIdProductoAndActivoTrue(id).map(producto -> {
            producto.setActivo(false);
            productoRepository.save(producto); // Guardamos el cambio de estado
            return true;
        }).orElse(false);
    }

}