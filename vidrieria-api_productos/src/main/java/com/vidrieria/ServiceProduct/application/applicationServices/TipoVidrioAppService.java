package com.vidrieria.ServiceProduct.application.applicationServices;

import com.vidrieria.ServiceProduct.application.dto.TipoVidrioDTO;
import com.vidrieria.ServiceProduct.application.mappers.TipoVidrioMapper;
import com.vidrieria.ServiceProduct.domain.interfaceService.ITipoVidrioService;
import com.vidrieria.ServiceProduct.domain.model.TipoVidrio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TipoVidrioAppService {

    @Autowired
    private ITipoVidrioService tipoVidrioService;

    @Autowired
    private TipoVidrioMapper tipoVidrioMapper;

    // CREATE
    public TipoVidrio createTipoVidrio(TipoVidrioDTO dto) {
        TipoVidrio tipoVidrio = tipoVidrioMapper.toEntity(dto);
        return tipoVidrioService.save(tipoVidrio);
    }

    // READ ALL con paginación y búsqueda
    public Page<TipoVidrio> findAll(Pageable pageable, String searchTerm) {
        if (searchTerm != null && !searchTerm.isEmpty()) {
            return tipoVidrioService.findActivosByNombre(searchTerm, pageable);
        } else {
            return tipoVidrioService.findAllActivos(pageable);
        }
    }

    // READ BY ID
    public Optional<TipoVidrio> findById(Integer id) {
        return tipoVidrioService.findActivoById(id); //
    }

    // UPDATE
    public Optional<TipoVidrio> update(Integer id, TipoVidrioDTO dto) {
        return tipoVidrioService.findActivoById(id).map(existingTipoVidrio -> {
            tipoVidrioMapper.updateEntityFromDto(dto, existingTipoVidrio);
            return tipoVidrioService.save(existingTipoVidrio);
        });
    }

    // DELETE Soft Delete
    public boolean delete(Integer id) {
        return tipoVidrioService.softDelete(id);
    }
}