package com.vidrieria.ServiceProduct.domain.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "materiales")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_material")
    private Integer idMaterial;

    private String nombre;
    private String descripcion;

    @Column(name = "tipo_material", nullable = false)
    private String tipoMaterial;

    @Column(name = "imagen_url")
    private String imagenUrl;

    @Column(name = "activo")
    private Boolean activo = true;
}
