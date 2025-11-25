package com.vidrieria.ServiceGateway;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/fallback")
public class FallbackController {

    private ResponseEntity<Map<String, Object>> createStructuredResponse(String message) {
        Map<String, Object> response = new HashMap<>();

        response.put("content", new ArrayList<>());

        Map<String, Object> page = new HashMap<>();
        page.put("totalPages", 0);
        page.put("totalElements", 0);

        response.put("page", page);

        response.put("status", "FALLBACK_RESILIENCIA");
        response.put("mensaje_usuario", message);

        return ResponseEntity.ok(response);
    }

    @RequestMapping("/inventario")
    public Mono<ResponseEntity<Map<String, Object>>> inventarioFallback() {
        return Mono.just(createStructuredResponse("Servicio de Inventario no disponible. Mostrando stock vacío."));
    }

    @GetMapping("/productos")
    public Mono<ResponseEntity<Map<String, Object>>> productosFallback() {
        return Mono.just(createStructuredResponse(
                "Servicio de Productos y Materiales no disponible. Mostrando catálogo vacío."));
    }

    @RequestMapping("/usuarios")
    public Mono<ResponseEntity<String>> usuariosFallback() {
        return Mono.just(ResponseEntity
                .status(HttpStatus.SERVICE_UNAVAILABLE)
                .body("El servicio de usuarios está tardando demasiado o no está disponible."));
    }
}