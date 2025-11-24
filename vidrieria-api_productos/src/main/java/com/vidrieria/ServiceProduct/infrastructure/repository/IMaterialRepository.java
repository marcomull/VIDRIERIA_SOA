package com.vidrieria.ServiceProduct.infrastructure.repository;

import com.vidrieria.ServiceProduct.domain.model.Material;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IMaterialRepository extends JpaRepository<Material, Integer> {
    Page<Material> findAllByActivoTrue(Pageable pageable);
    Page<Material> findByNombreContainingIgnoreCaseAndActivoTrue(String nombre, Pageable pageable);
    Optional<Material> findByIdMaterialAndActivoTrue(Integer id);
}
