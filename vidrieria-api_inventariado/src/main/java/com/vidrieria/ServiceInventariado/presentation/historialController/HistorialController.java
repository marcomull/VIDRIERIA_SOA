package com.vidrieria.ServiceInventariado.presentation.historialController;

import com.vidrieria.ServiceInventariado.application.applicationServices.HistorialAppService;
import com.vidrieria.ServiceInventariado.application.dto.MovimientoMaterialDTO;
import com.vidrieria.ServiceInventariado.application.dto.MovimientoVidrioDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/historial")
public class HistorialController {

    @Autowired
    private HistorialAppService appService; // Llama a la capa de Aplicación

    @GetMapping("/vidrio/{idStockVidrio}")
    public ResponseEntity<List<MovimientoVidrioDTO>> getHistorialVidrio(@PathVariable Integer idStockVidrio) {
        List<MovimientoVidrioDTO> historial = appService.getHistorialVidrio(idStockVidrio);
        return ResponseEntity.ok(historial);
    }

    @GetMapping("/material/{idStockMaterial}")
    public ResponseEntity<List<MovimientoMaterialDTO>> getHistorialMaterial(@PathVariable Integer idStockMaterial) {
        List<MovimientoMaterialDTO> historial = appService.getHistorialMaterial(idStockMaterial);
        return ResponseEntity.ok(historial);
    }
}