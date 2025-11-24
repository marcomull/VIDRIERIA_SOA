package com.vidrieria.ServiceInventariado.application.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class StockVidrioDTO {
    private Integer idStockVidrio;
    private Integer idVidrio; // FK al servicio de productos
    private Double espesor;
    private Double ancho;
    private Double alto;
    private Integer cantidad;
    private Boolean esRetazo;
    private Double precioM2;
    private String ubicacion;
    private LocalDateTime fechaIngreso;
    private Boolean activo;
    // Podrías añadir nombreVidrio si necesitas traerlo del otro servicio
}