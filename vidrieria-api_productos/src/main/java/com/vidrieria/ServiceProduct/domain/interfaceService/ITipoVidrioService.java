package com.vidrieria.ServiceProduct.domain.interfaceService;

import com.vidrieria.ServiceProduct.domain.model.TipoVidrio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ITipoVidrioService {
    TipoVidrio save(TipoVidrio tipoVidrio);
    Page<TipoVidrio> findAllActivos(Pageable pageable);
    Page<TipoVidrio> findActivosByNombre(String nombre, Pageable pageable);
    Optional<TipoVidrio> findActivoById(Integer Id);
    boolean softDelete(Integer Id);
}