package com.vidrieria.ServiceInventariado.infrastructure.client;

import com.vidrieria.ServiceInventariado.application.dto.UsuarioEmailDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import com.vidrieria.ServiceInventariado.application.dto.UsuarioKardexDTO;
import java.util.Map;
import java.util.stream.Collectors;

import java.util.Collections;
import java.util.List;

@Component
public class UsuarioServiceClient {

    private final RestTemplate restTemplate;
    private final String USUARIOS_API_URL = "http://localhost:8080/usuarios";

    @Value("${internal.api.key}")
    private String internalApiKey;

    public UsuarioServiceClient() {
        this.restTemplate = new RestTemplate();
    }

    public List<UsuarioEmailDto> getUsuariosPorRoles(List<String> roles) {

        String url = USUARIOS_API_URL + "/internal/by-roles?roles=" + String.join(",", roles);

        try {
            HttpHeaders headers = new HttpHeaders();

            headers.set("X-API-Key", internalApiKey);
            HttpEntity<Void> entity = new HttpEntity<>(headers);

            ResponseEntity<List<UsuarioEmailDto>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    new ParameterizedTypeReference<List<UsuarioEmailDto>>() {}
            );
            return response.getBody();

        } catch (Exception e) {
            System.err.println("Error al obtener usuarios por rol (A2A): " + e.getMessage());
            System.err.println("Asegúrate de que api-usuarios (8080) esté corriendo y que INTERNAL_API_KEY sea correcta en ambos servicios.");
            return Collections.emptyList();
        }
    }

    public Map<Integer, String> getNombresDeUsuariosPorIds(List<Integer> ids) {
        if (ids == null || ids.isEmpty()) {
            return Collections.emptyMap();
        }

        String idsComoString = ids.stream()
                .map(String::valueOf)
                .collect(Collectors.joining(","));

        String url = USUARIOS_API_URL + "/internal/by-ids?ids=" + idsComoString;

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("X-API-Key", internalApiKey); // Usamos la API Key que ya tienes
            HttpEntity<Void> entity = new HttpEntity<>(headers);

            ResponseEntity<List<UsuarioKardexDTO>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    new ParameterizedTypeReference<List<UsuarioKardexDTO>>() {}
            );

            // Convertir la Lista de DTOs en un Mapa [ID -> Nombre] para fácil acceso
            if (response.getBody() == null) {
                return Collections.emptyMap();
            }
            return response.getBody().stream()
                    .collect(Collectors.toMap(
                            UsuarioKardexDTO::getIdUsuario,
                            UsuarioKardexDTO::getNombreCompleto
                    ));

        } catch (Exception e) {
            System.err.println("Error al obtener nombres de usuarios (A2A): " + e.getMessage());
            return Collections.emptyMap();
        }
    }
}