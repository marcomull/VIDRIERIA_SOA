package com.vidrieria.ServiceUser.domain.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUsuario;

    private String nombre;
    private String apellido;

    @Column(unique = true, nullable = false)
    private String correo;

    private String contrasena;
    private String telefono;
    private String dni;
    private String ruc;
    private String direccion;

    @Enumerated(EnumType.STRING)
    private Rol rol = Rol.CLIENTE;

    private java.time.LocalDateTime fechaRegistro;

    public enum Rol {
        ADMIN, CLIENTE, VENDEDOR, TALLER, ALMACEN
    }

    @Column(name = "activo")
    private Boolean activo = true;

    @Column(name = "verificado")
    private Boolean verificado = false;

    @Column(name = "codigo_verificacion")
    private String codigoVerificacion;

    @Column(name = "fecha_expiracion")
    private java.time.LocalDateTime fechaExpiracionCodigo;

    @Column(name = "reset_password_token")
    private String resetPasswordToken;

    @Column(name = "reset_password_token_expiracion")
    private java.time.LocalDateTime resetPasswordTokenExpiracion;
}
