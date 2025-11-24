package com.vidrieria.ServiceUser.application.dto;

import lombok.Data;

@Data
public class ChangePasswordDTO {
    private String contrasenaActual;
    private String nuevaContrasena;
    private String confirmarNuevaContrasena;
}