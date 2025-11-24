package com.vidrieria.ServiceProduct.presentation.materialController;

import com.vidrieria.ServiceProduct.application.applicationServices.MaterialAppService;
import com.vidrieria.ServiceProduct.application.dto.MaterialDTO;
import com.vidrieria.ServiceProduct.domain.model.Material;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/catalogo/materiales")
public class MaterialController {

    @Autowired
    private MaterialAppService materialAppService;

    @PostMapping
    public ResponseEntity<Material> crearMaterial(@RequestBody MaterialDTO materialDTO) {
        Material nuevoMaterial = materialAppService.createMaterial(materialDTO);
        return ResponseEntity.status(201).body(nuevoMaterial);
    }

    @GetMapping
    public ResponseEntity<Page<Material>> listarMaterial(
            Pageable pageable,
            @RequestParam(value = "search", required = false) String searchTerm) {
        Page<Material> material = materialAppService.findAll(pageable, searchTerm);
        return ResponseEntity.ok(material);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Material> obtenerMaterialPorId(@PathVariable Integer id) {
        return materialAppService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Material> actualizarMaterial(
            @PathVariable Integer id,
            @RequestBody MaterialDTO materialDTO) {

        return materialAppService.update(id, materialDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarMaterial(@PathVariable Integer id) {
        boolean eliminado = materialAppService.delete(id);
        if (eliminado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}