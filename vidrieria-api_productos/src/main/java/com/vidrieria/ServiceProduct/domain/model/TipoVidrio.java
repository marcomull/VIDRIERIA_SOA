package com.vidrieria.ServiceProduct.domain.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tipos_vidrio")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class TipoVidrio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_vidrio")
    private Integer idTipoVidrio;

    private String nombre;
    private String descripcion;

    @Column(name = "imagen_url")
    private String imagenUrl;

    @Column(name = "activo")
    private Boolean activo = true;
}
