package com.vidrieria.ServiceProduct.presentation.productoController;

import com.vidrieria.ServiceProduct.application.applicationServices.ProductoAppService;
import com.vidrieria.ServiceProduct.application.dto.ProductoDTO;
import com.vidrieria.ServiceProduct.domain.model.Producto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/catalogo/productos")
public class ProductoController {

    @Autowired
    private ProductoAppService productoAppService;

    // Endpoint para que el ADMIN cree un nuevo producto
    @PostMapping
    public ResponseEntity<Producto> crearProducto(@RequestBody ProductoDTO productoDTO) {
        Producto nuevoProducto = productoAppService.createProducto(productoDTO);
        return ResponseEntity.status(201).body(nuevoProducto);
    }

    @GetMapping
    public ResponseEntity<Page<Producto>> listarProductos(
            Pageable pageable,
            @RequestParam(value = "search", required = false) String searchTerm) {
        Page<Producto> productos = productoAppService.findAll(pageable, searchTerm);
        return ResponseEntity.ok(productos);
    }

    /**
     * Endpoint público para obtener un producto activo por su ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerProductoPorId(@PathVariable Integer id) {
        return productoAppService.findById(id)
                .map(ResponseEntity::ok) // Si se encuentra, devuelve 200 OK con el producto
                .orElse(ResponseEntity.notFound().build()); // Si no, devuelve 404 Not Found
    }

    /**
     * Endpoint para que el ADMIN actualice un producto existente.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(
            @PathVariable Integer id,
            @RequestBody ProductoDTO productoDTO) {

        return productoAppService.update(id, productoDTO)
                .map(ResponseEntity::ok) // Si actualiza, devuelve 200 OK con el producto actualizado
                .orElse(ResponseEntity.notFound().build()); // Si no encuentra el producto, devuelve 404
    }

    /**
     * Endpoint para que el ADMIN realice un borrado lógico (soft delete) de un producto.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Integer id) {
        boolean eliminado = productoAppService.delete(id);
        if (eliminado) {
            return ResponseEntity.noContent().build(); // Devuelve 204 No Content si se eliminó
        } else {
            return ResponseEntity.notFound().build(); // Devuelve 404 si no se encontró el producto
        }
    }
}

