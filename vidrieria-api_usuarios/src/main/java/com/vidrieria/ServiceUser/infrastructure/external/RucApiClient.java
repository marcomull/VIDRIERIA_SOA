package com.vidrieria.ServiceUser.infrastructure.external;

import com.vidrieria.ServiceUser.application.dto.ApiResponseDto;
import com.vidrieria.ServiceUser.application.dto.RucDto;
import com.vidrieria.ServiceUser.infrastructure.config.ApiConfig;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class RucApiClient {

    private static final String API_URL = "https://api.factiliza.com/v1/ruc/info/%s";

    private final ApiConfig apiConfig;
    private final RestTemplate restTemplate;

    public RucApiClient(ApiConfig apiConfig) {
        this.apiConfig = apiConfig;
        this.restTemplate = new RestTemplate();
    }

    public RucDto getRucData(String ruc) {
        String url = String.format(API_URL, ruc);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiConfig.getApiToken());

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<ApiResponseDto<RucDto>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<ApiResponseDto<RucDto>>() {}
        );

        ApiResponseDto<RucDto> body = response.getBody();

        if (body == null || !body.isSuccess() || body.getData() == null) {
            throw new IllegalArgumentException("Error en la consulta de RUC: " + (body != null ? body.getMessage() : "sin respuesta"));
        }

        return body.getData();
    }
}
