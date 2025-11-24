package com.vidrieria.ServiceUser.application.dto;

import lombok.Data;

@Data
public class UsuarioDTO {
    private Integer idUsuario;
    private String nombre;
    private String apellido;
    private String correo;
    private String contrasena;
    private String telefono;
    private String dni;
    private String ruc;
    private String direccion;
    private String rol; // ADMIN o CLIENTE
    private java.time.LocalDateTime fechaRegistro;
}
