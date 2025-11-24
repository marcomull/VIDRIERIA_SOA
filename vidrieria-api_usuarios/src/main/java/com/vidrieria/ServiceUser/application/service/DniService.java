package com.vidrieria.ServiceUser.application.service;

import com.vidrieria.ServiceUser.infrastructure.external.DniApiClient;
import com.vidrieria.ServiceUser.application.dto.DniDto;
import org.springframework.stereotype.Service;

@Service
public class DniService {

    private final DniApiClient dniApiClient;

    public DniService(DniApiClient dniApiClient) {
        this.dniApiClient = dniApiClient;
    }

    public DniDto getDniData(String dni) {
        return dniApiClient.getDniData(dni);
    }
}

