package com.vidrieria.ServiceUser.application.service;

import com.vidrieria.ServiceUser.infrastructure.external.RucApiClient;
import com.vidrieria.ServiceUser.application.dto.RucDto;
import org.springframework.stereotype.Service;

@Service
public class RucService {

    private final RucApiClient rucApiClient;

    public RucService(RucApiClient rucApiClient) {
        this.rucApiClient = rucApiClient;
    }

    public RucDto getRucData(String ruc) {
        return rucApiClient.getRucData(ruc);
    }
}
