package com.vidrieria.ServiceProduct.infrastructure.repository;

import com.vidrieria.ServiceProduct.domain.model.Producto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IProductoRepository extends JpaRepository<Producto, Integer> {
    Page<Producto> findAllByActivoTrue(Pageable pageable);
    Page<Producto> findByNombreContainingIgnoreCaseAndActivoTrue(String nombre, Pageable pageable);
    Optional<Producto> findByIdProductoAndActivoTrue(Integer id);
}