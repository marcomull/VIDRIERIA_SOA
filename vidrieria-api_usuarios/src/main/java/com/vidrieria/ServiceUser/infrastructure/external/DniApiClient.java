package com.vidrieria.ServiceUser.infrastructure.external;

import com.vidrieria.ServiceUser.application.dto.ApiResponseDto;
import com.vidrieria.ServiceUser.application.dto.DniDto;
import com.vidrieria.ServiceUser.infrastructure.config.ApiConfig;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class DniApiClient {

    private static final String API_URL = "https://api.factiliza.com/v1/dni/info/%s";

    private final ApiConfig apiConfig;
    private final RestTemplate restTemplate;

    public DniApiClient(ApiConfig apiConfig) {
        this.apiConfig = apiConfig;
        this.restTemplate = new RestTemplate();
    }

    public DniDto getDniData(String dni) {
        String url = String.format(API_URL, dni);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiConfig.getApiToken());

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<ApiResponseDto<DniDto>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<ApiResponseDto<DniDto>>() {}
        );

        ApiResponseDto<DniDto> body = response.getBody();

        if (body == null || !body.isSuccess() || body.getData() == null) {
            throw new IllegalArgumentException("Error en la consulta de DNI: " + (body != null ? body.getMessage() : "sin respuesta"));
        }

        return body.getData();
    }
}
