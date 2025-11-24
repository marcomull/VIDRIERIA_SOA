package com.vidrieria.ServiceInventariado.domain.interfaceService;

import com.vidrieria.ServiceInventariado.domain.model.MovimientoMaterial;
import com.vidrieria.ServiceInventariado.domain.model.MovimientoVidrio;
import com.vidrieria.ServiceInventariado.domain.model.StockMaterial;
import com.vidrieria.ServiceInventariado.domain.model.StockVidrio;
import com.vidrieria.ServiceInventariado.domain.model.TipoMovimiento;
import java.util.List;

public interface IHistorialService {
    // Métodos para registrar movimientos
    void registrarMovimientoVidrio(StockVidrio item, TipoMovimiento tipo, int cantidadMovida);
    void registrarMovimientoMaterial(StockMaterial item, TipoMovimiento tipo, int cantidadMovida);

    // Métodos para consultar el historial
    List<MovimientoVidrio> findHistorialVidrio(Integer idStockVidrio);
    List<MovimientoMaterial> findHistorialMaterial(Integer idStockMaterial);
}