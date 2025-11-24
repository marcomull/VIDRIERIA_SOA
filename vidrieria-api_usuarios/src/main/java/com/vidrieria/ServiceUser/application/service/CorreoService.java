package com.vidrieria.ServiceUser.application.service;

import com.vidrieria.ServiceUser.infrastructure.external.EmailVerifyClient;
import org.springframework.stereotype.Service;

@Service
public class CorreoService {

    private final EmailVerifyClient emailVerificationClient;

    public CorreoService(EmailVerifyClient emailVerificationClient) {
        this.emailVerificationClient = emailVerificationClient;
    }

    public boolean verificarCorreo(String correo) {
        return emailVerificationClient.verificarCorreo(correo);
    }
}
