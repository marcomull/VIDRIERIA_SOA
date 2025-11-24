package com.vidrieria.ServiceInventariado.presentation.stockVidrioController;

import com.vidrieria.ServiceInventariado.application.applicationServices.StockVidrioAppService;
import com.vidrieria.ServiceInventariado.application.dto.StockVidrioDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/stock/vidrios") // Endpoint base para stock de vidrio
public class StockVidrioController {

    @Autowired
    private StockVidrioAppService appService;

    @PostMapping
    public ResponseEntity<StockVidrioDTO> addStock(@RequestBody StockVidrioDTO dto) {
        StockVidrioDTO nuevoStock = appService.createStock(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoStock);
    }

    @GetMapping
    public ResponseEntity<List<StockVidrioDTO>> getAllStock() {
        List<StockVidrioDTO> stockList = appService.getAllStock();
        return ResponseEntity.ok(stockList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockVidrioDTO> getStockById(@PathVariable Integer id) {
        return appService.getStockById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tipo/{idVidrio}")
    public ResponseEntity<List<StockVidrioDTO>> getStockByVidrioId(@PathVariable Integer idVidrio) {
        List<StockVidrioDTO> stockList = appService.getStockByIdVidrio(idVidrio);
        if (stockList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(stockList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StockVidrioDTO> updateStock(@PathVariable Integer id, @RequestBody StockVidrioDTO dto) {
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