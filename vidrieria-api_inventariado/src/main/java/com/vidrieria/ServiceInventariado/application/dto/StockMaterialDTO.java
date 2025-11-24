package com.vidrieria.ServiceInventariado.application.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class StockMaterialDTO {
    private Integer idStockMaterial;
    private Integer idMaterial; // Necesitarás el nombre del material desde el otro servicio
    private Double largo;
    private Integer cantidad;
    private Boolean esRetazo;
    private Double precioMetro;
    private String ubicacion;
    private LocalDateTime fechaIngreso;
    private Boolean activo;
    // Podrías añadir campos extra como 'nombreMaterial' que llenarías consultando
    // al servicio de productos.
}