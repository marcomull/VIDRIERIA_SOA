package com.vidrieria.ServiceInventariado.application.dto;

import com.vidrieria.ServiceInventariado.domain.model.TipoMovimiento;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class MovimientoVidrioDTO {
    private Integer idHistorial;
    private Integer idStockVidrio;
    private TipoMovimiento tipoMovimiento;
    private int cantidadMovida;
    private int stockRestante;
    private Integer idUsuarioResponsable;
    private LocalDateTime fechaMovimiento;
    private String nombreUsuarioResponsable;
}