package com.vidrieria.ServiceProduct.domain.interfaceService;

import com.vidrieria.ServiceProduct.domain.model.Material;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface IMaterialService {
    Material save(Material material);
    Page<Material> findAllActivos(Pageable pageable);
    Page<Material> findActivosByNombre(String nombre, Pageable pageable);
    Optional<Material> findActivoById(Integer Id);
    boolean softDelete(Integer Id);
}