package com.vidrieria.ServiceInventariado.application.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UsuarioEmailDto {
    private String correo;
    private String nombre;
    // No necesitamos más campos para el email
}