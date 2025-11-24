package com.vidrieria.ServiceInventariado.domain.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "stock_material")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockMaterial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idStockMaterial;

    @Column(name = "id_material", nullable = false)
    private Integer idMaterial; // FK a tu tabla 'materiales' (en el servicio de productos)

    @Column(nullable = false)
    private Double largo;

    @Column(nullable = false)
    private Integer cantidad;

    @Column(name = "es_retazo")
    private Boolean esRetazo = false;

    private Double precioMetro;
    private String ubicacion;

    private LocalDateTime fechaIngreso = LocalDateTime.now();

    @Column(nullable = false)
    private Boolean activo = true;

    // Podrías añadir una relación @ManyToOne si tuvieras la entidad Material aquí,
    // pero como está en otro servicio, mantenemos solo el ID.
}