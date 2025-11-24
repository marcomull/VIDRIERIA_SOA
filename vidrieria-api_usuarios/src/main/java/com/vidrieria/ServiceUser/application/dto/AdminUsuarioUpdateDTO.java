package com.vidrieria.ServiceUser.application.dto;

import lombok.Data;

@Data
public class AdminUsuarioUpdateDTO {
    private String nombre;
    private String apellido;
    private String correo;
    private String telefono;
    private String dni;
    private String ruc;
    private String direccion;
    private String rol;
}