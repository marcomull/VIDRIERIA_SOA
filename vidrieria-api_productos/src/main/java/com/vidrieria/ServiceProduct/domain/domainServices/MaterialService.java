package com.vidrieria.ServiceProduct.domain.domainServices;

import com.vidrieria.ServiceProduct.domain.interfaceService.IMaterialService;
import com.vidrieria.ServiceProduct.domain.model.Material;
import com.vidrieria.ServiceProduct.infrastructure.repository.IMaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MaterialService implements IMaterialService {

    @Autowired
    private IMaterialRepository materialRepository;

    @Override
    public Material save(Material material) {
        if (material.getIdMaterial() == null) {
            material.setActivo(true);
        }
        return materialRepository.save(material);
    }

    @Override
    public Page<Material> findAllActivos(Pageable pageable) {
        return materialRepository.findAllByActivoTrue(pageable);
    }

    @Override
    public Page<Material> findActivosByNombre(String nombre, Pageable pageable) {
        return materialRepository.findByNombreContainingIgnoreCaseAndActivoTrue(nombre, pageable);
    }

    @Override
    public Optional<Material> findActivoById(Integer id) {
        return materialRepository.findByIdMaterialAndActivoTrue(id);
    }

    @Override
    public boolean softDelete(Integer id) {
        return materialRepository.findByIdMaterialAndActivoTrue(id).map(material -> {
            material.setActivo(false);
            materialRepository.save(material);
            return true;
        }).orElse(false);
    }
}