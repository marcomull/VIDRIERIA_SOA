package com.vidrieria.ServiceUser.infrastructure.external;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Component
public class EmailVerifyClient {

    @Value("${emaillistverify.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public boolean verificarCorreo(String email) {
        try {
            // Construir la URL de la API
            String url = UriComponentsBuilder.fromHttpUrl("https://apps.emaillistverify.com/api/verifEmail")
                    .queryParam("secret", apiKey)
                    .queryParam("email", email)
                    .toUriString();
            // Realizar la solicitud GET
            String response = restTemplate.getForObject(url, String.class);
            /*
             * respuestas:
             * "ok"            → correo válido
             * "bad"           → correo inválido
             * "unknown"       → dominio válido pero buzón no confirmado
             * "error" o vacío → fallo en la validación
             */
            return response != null && response.trim().equalsIgnoreCase("ok");
        } catch (Exception e) {
            return false;
        }
    }
}
