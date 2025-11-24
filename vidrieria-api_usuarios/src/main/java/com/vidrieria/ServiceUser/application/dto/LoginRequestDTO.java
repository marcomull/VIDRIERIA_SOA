package com.vidrieria.ServiceUser.application.dto;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String correo;
    private String contrasena;
}

