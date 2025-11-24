package com.vidrieria.ServiceProduct.application.applicationServices;

import com.vidrieria.ServiceProduct.application.dto.MaterialDTO;
import com.vidrieria.ServiceProduct.application.mappers.MaterialMapper;
import com.vidrieria.ServiceProduct.domain.interfaceService.IMaterialService;
import com.vidrieria.ServiceProduct.domain.model.Material;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MaterialAppService {

    @Autowired
    private IMaterialService materialService;

    @Autowired
    private MaterialMapper materialMapper;

    // CREATE
    public Material createMaterial(MaterialDTO dto) {
        Material material = materialMapper.toEntity(dto);
        return materialService.save(material);
    }

    // READ ALL con paginación y búsqueda
    public Page<Material> findAll(Pageable pageable, String searchTerm) {
        if (searchTerm != null && !searchTerm.isEmpty()) {
            return materialService.findActivosByNombre(searchTerm, pageable);
        } else {
            return materialService.findAllActivos(pageable);
        }
    }

    // READ BY ID
    public Optional<Material> findById(Integer id) {
        return materialService.findActivoById(id); //
    }

    // UPDATE
    public Optional<Material> update(Integer id, MaterialDTO dto) {
        return materialService.findActivoById(id).map(existingMaterial -> {
            materialMapper.updateEntityFromDto(dto, existingMaterial);
            return materialService.save(existingMaterial);
        });
    }

    // DELETE Soft Delete
    public boolean delete(Integer id) {
        return materialService.softDelete(id);
    }
}