package com.vidrieria.ServiceUser.application.dto;

import lombok.Data;

@Data
public class ClienteUsuarioUpdateDTO {
    private String nombre;
    private String apellido;
    private String correo;
    private String telefono;
    private String dni;
    private String ruc;
    private String direccion;
    private String contrasena; // El cliente sí puede enviar una nueva contraseña
}