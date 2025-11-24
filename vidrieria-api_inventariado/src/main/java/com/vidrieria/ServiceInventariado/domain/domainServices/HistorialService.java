package com.vidrieria.ServiceInventariado.domain.domainServices;

import com.vidrieria.ServiceInventariado.domain.interfaceService.IHistorialService;
import com.vidrieria.ServiceInventariado.domain.model.MovimientoMaterial;
import com.vidrieria.ServiceInventariado.domain.model.MovimientoVidrio;
import com.vidrieria.ServiceInventariado.domain.model.StockMaterial;
import com.vidrieria.ServiceInventariado.domain.model.StockVidrio;
import com.vidrieria.ServiceInventariado.domain.model.TipoMovimiento;
import com.vidrieria.ServiceInventariado.infrastructure.repository.IMovimientoMaterialRepository;
import com.vidrieria.ServiceInventariado.infrastructure.repository.IMovimientoVidrioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HistorialService implements IHistorialService {

    @Autowired
    private IMovimientoVidrioRepository vidrioRepo;

    @Autowired
    private IMovimientoMaterialRepository materialRepo;

    @Override
    public void registrarMovimientoVidrio(StockVidrio item, TipoMovimiento tipo, int cantidadMovida) {
        MovimientoVidrio mov = new MovimientoVidrio();
        mov.setIdStockVidrio(item.getIdStockVidrio());
        mov.setTipoMovimiento(tipo);
        mov.setCantidadMovida(cantidadMovida);
        mov.setStockRestante(item.getCantidad());
        mov.setIdUsuarioResponsable(getIdUsuarioDesdeToken());
        vidrioRepo.save(mov);
    }

    @Override
    public void registrarMovimientoMaterial(StockMaterial item, TipoMovimiento tipo, int cantidadMovida) {
        MovimientoMaterial mov = new MovimientoMaterial();
        mov.setIdStockMaterial(item.getIdStockMaterial());
        mov.setTipoMovimiento(tipo);
        mov.setCantidadMovida(cantidadMovida);
        mov.setStockRestante(item.getCantidad());
        mov.setIdUsuarioResponsable(getIdUsuarioDesdeToken());
        materialRepo.save(mov);
    }

    @Override
    public List<MovimientoVidrio> findHistorialVidrio(Integer idStockVidrio) {
        return vidrioRepo.findByIdStockVidrioOrderByIdHistorialDesc(idStockVidrio);
    }

    @Override
    public List<MovimientoMaterial> findHistorialMaterial(Integer idStockMaterial) {
        return materialRepo.findByIdStockMaterialOrderByIdHistorialDesc(idStockMaterial);
    }

    private Integer getIdUsuarioDesdeToken() {
        try {
            // ID del usuario
            return (Integer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        } catch (Exception e) {
            return null;
        }
    }
}