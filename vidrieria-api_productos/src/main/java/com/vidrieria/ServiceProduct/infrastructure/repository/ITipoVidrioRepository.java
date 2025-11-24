package com.vidrieria.ServiceProduct.infrastructure.repository;


import com.vidrieria.ServiceProduct.domain.model.TipoVidrio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ITipoVidrioRepository extends JpaRepository<TipoVidrio, Integer> {
    Page<TipoVidrio> findAllByActivoTrue(Pageable pageable);
    Page<TipoVidrio> findByNombreContainingIgnoreCaseAndActivoTrue(String nombre, Pageable pageable);
    Optional<TipoVidrio> findByIdTipoVidrioAndActivoTrue(Integer id);
}
