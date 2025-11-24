package com.vidrieria.ServiceProduct.domain.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "productos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producto")
    private Integer idProducto;

    private String nombre;
    private String descripcion;

    @Enumerated(EnumType.STRING)
    private Tipo tipo;

    public enum Tipo {
        VIDRIO, VITRINA, MAMPARA, CUADRO, VENTANA, ESPEJO
    }

    @Column(name = "imagen_url")
    private String imagenUrl;

    @Column(name = "activo")
    private Boolean activo = true;
}
