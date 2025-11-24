package com.vidrieria.ServiceUser.application.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RucDto {
    @JsonProperty("numero")   // <- el campo real de la API
    private String ruc;

    @JsonProperty("nombre_completo")
    private String razonSocial;

    private String estado;
    private String direccion;
}
