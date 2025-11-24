package com.vidrieria.ServiceUser.infrastructure.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApiConfig {

    @Value("${factiliza.token}")
    private String apiToken;

    public String getApiToken() {
        return apiToken;
    }
}

