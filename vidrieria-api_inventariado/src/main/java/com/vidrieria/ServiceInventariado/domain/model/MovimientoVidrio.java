package com.vidrieria.ServiceInventariado.domain.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "historial_movimientos_vidrio")
@Data
@NoArgsConstructor
public class MovimientoVidrio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idHistorial;

    private Integer idStockVidrio;

    @Enumerated(EnumType.STRING)
    private TipoMovimiento tipoMovimiento;

    private int cantidadMovida;
    private int stockRestante;
    private Integer idUsuarioResponsable;
    private LocalDateTime fechaMovimiento = LocalDateTime.now();
}