package com.vidrieria.ServiceInventariado.domain.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "stock_vidrio")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockVidrio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idStockVidrio;

    @Column(name = "id_vidrio", nullable = false)
    private Integer idVidrio; // FK a tu tabla 'tipos_vidrio'

    @Column(nullable = false)
    private Double espesor;

    @Column(nullable = false)
    private Double ancho;

    @Column(nullable = false)
    private Double alto; // Cambié 'largo' a 'alto' para consistencia con tu BD

    @Column(nullable = false)
    private Integer cantidad = 1;

    @Column(name = "es_retazo")
    private Boolean esRetazo = false;

    private Double precioM2;
    private String ubicacion;

    private LocalDateTime fechaIngreso = LocalDateTime.now();

    @Column(nullable = false)
    private Boolean activo = true;
}