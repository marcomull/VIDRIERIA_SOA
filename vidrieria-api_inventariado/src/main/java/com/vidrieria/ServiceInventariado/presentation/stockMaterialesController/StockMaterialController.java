package com.vidrieria.ServiceInventariado.presentation.stockMaterialesController;

import com.vidrieria.ServiceInventariado.application.applicationServices.StockMaterialAppService;
import com.vidrieria.ServiceInventariado.application.dto.StockMaterialDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/stock/materiales") // Endpoint base para stock de material
public class StockMaterialController {

    @Autowired
    private StockMaterialAppService appService;

    @PostMapping
    public ResponseEntity<StockMaterialDTO> addStock(@RequestBody StockMaterialDTO dto) {
        StockMaterialDTO nuevoStock = appService.createStock(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoStock);
    }

    @GetMapping
    public ResponseEntity<List<StockMaterialDTO>> getAllStock() {
        List<StockMaterialDTO> stockList = appService.getAllStock();
        return ResponseEntity.ok(stockList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockMaterialDTO> getStockById(@PathVariable Integer id) {
        return appService.getStockById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tipo/{idMaterial}")
    public ResponseEntity<List<StockMaterialDTO>> getStockByMaterialId(@PathVariable Integer idMaterial) {
        List<StockMaterialDTO> stockList = appService.getStockByIdMaterial(idMaterial);
        if (stockList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(stockList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StockMaterialDTO> updateStock(@PathVariable Integer id, @RequestBody StockMaterialDTO dto) {
        return appService.updateStock(id, dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStock(@PathVariable Integer id) {
        boolean deleted = appService.deleteStock(id);
        if (deleted) {
            return ResponseEntity.noContent().build(); // 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }
}