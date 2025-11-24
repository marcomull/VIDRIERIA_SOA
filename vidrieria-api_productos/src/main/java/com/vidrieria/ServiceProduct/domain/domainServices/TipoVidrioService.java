package com.vidrieria.ServiceProduct.domain.domainServices;

import com.vidrieria.ServiceProduct.domain.interfaceService.ITipoVidrioService;
import com.vidrieria.ServiceProduct.domain.model.TipoVidrio;
import com.vidrieria.ServiceProduct.infrastructure.repository.ITipoVidrioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TipoVidrioService implements ITipoVidrioService {

    @Autowired
    private ITipoVidrioRepository tipoVidrioRepository;

    @Override
    public TipoVidrio save(TipoVidrio tipoVidrio) {
        if (tipoVidrio.getIdTipoVidrio()== null) {
            tipoVidrio.setActivo(true);
        }
        return tipoVidrioRepository.save(tipoVidrio);
    }

    @Override
    public Page<TipoVidrio> findAllActivos(Pageable pageable) {
        return tipoVidrioRepository.findAllByActivoTrue(pageable);
    }

    @Override
    public Page<TipoVidrio> findActivosByNombre(String nombre, Pageable pageable) {
        return tipoVidrioRepository.findByNombreContainingIgnoreCaseAndActivoTrue(nombre, pageable);
    }

    @Override
    public Optional<TipoVidrio> findActivoById(Integer Id) {
        return tipoVidrioRepository.findByIdTipoVidrioAndActivoTrue(Id);
    }

    @Override
    public boolean softDelete(Integer Id) {
        return tipoVidrioRepository.findByIdTipoVidrioAndActivoTrue(Id).map(tipoVidrio -> {
            tipoVidrio.setActivo(false);
            tipoVidrioRepository.save(tipoVidrio);
            return true;
        }).orElse(false);
    }
}