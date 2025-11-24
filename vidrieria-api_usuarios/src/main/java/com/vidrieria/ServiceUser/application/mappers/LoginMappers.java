package com.vidrieria.ServiceUser.application.mappers;

import com.vidrieria.ServiceUser.application.dto.LoginResponseDTO;
import com.vidrieria.ServiceUser.domain.model.Usuario;
import org.springframework.stereotype.Component;

@Component
public class LoginMappers {

    // Mapeo de Administrator a UserDTO
    public LoginResponseDTO toDTO(Usuario usuario) {
        LoginResponseDTO dto = new LoginResponseDTO();
        dto.setId(usuario.getIdUsuario());
        dto.setCorreo(usuario.getCorreo());
        dto.setRol(usuario.getRol().toString());
        return dto;
    }

}
