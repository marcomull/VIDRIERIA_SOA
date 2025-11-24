package com.vidrieria.ServiceUser.application.applicationServices;

import com.vidrieria.ServiceUser.application.dto.LoginResponseDTO;
import com.vidrieria.ServiceUser.application.mappers.LoginMappers;
import com.vidrieria.ServiceUser.domain.domainServices.UsuarioLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginAppService {

    private final UsuarioLoginService usuarioLoginService;
    private final LoginMappers loginMappers;

    @Autowired
    public LoginAppService(UsuarioLoginService usuarioLoginService, LoginMappers loginMappers) {
        this.usuarioLoginService = usuarioLoginService;
        this.loginMappers = loginMappers;
    }

    // Login Usuario
    public Optional<LoginResponseDTO> loginAsUsuario(String correo, String contrasena){
        var usuarioOpt = usuarioLoginService.login(correo, contrasena);
        return usuarioOpt.map(loginMappers::toDTO);
    }
}
