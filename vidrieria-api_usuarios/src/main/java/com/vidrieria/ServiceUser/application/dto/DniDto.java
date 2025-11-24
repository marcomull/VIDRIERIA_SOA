package com.vidrieria.ServiceUser.application.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DniDto {

    @JsonProperty("numero")
    private String dni;

    private String nombres;

    @JsonProperty("apellido_paterno")
    private String apellidoPaterno;

    @JsonProperty("apellido_materno")
    private String apellidoMaterno;

    @JsonProperty("nombre_completo")
    private String nombreCompleto;

    private String departamento;
    private String provincia;
    private String distrito;
    private String direccion;

    @JsonProperty("direccion_completa")
    private String direccionCompleta;

    @JsonProperty("fecha_nacimiento")
    private String fechaNacimiento;

    private String sexo;
}
