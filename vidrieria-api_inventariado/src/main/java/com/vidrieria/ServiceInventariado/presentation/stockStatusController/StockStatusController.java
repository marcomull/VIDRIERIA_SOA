package com.vidrieria.ServiceInventariado.presentation.stockStatusController;

import com.vidrieria.ServiceInventariado.application.applicationServices.NotificationService; // <-- 1. AÑADIR IMPORT
import com.vidrieria.ServiceInventariado.domain.interfaceService.IStockMaterialService;
import com.vidrieria.ServiceInventariado.domain.interfaceService.IStockVidrioService;
import com.vidrieria.ServiceInventariado.domain.model.StockMaterial;
import com.vidrieria.ServiceInventariado.domain.model.StockVidrio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping; // <-- 2. AÑADIR IMPORT
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/stock")
public class StockStatusController {

    @Autowired
    private IStockVidrioService stockVidrioService;

    @Autowired
    private IStockMaterialService stockMaterialService;

    // --- 3. AÑADIR ESTA INYECCIÓN ---
    @Autowired
    private NotificationService notificationService;

    @Value("${inventario.notificacion.umbral-stock}")
    private int umbralStock;

    /**
     * Endpoint ligero para que el Frontend consulte si hay stock bajo.
     */
    @GetMapping("/status-check")
    public ResponseEntity<Map<String, Integer>> checkLowStockStatus() {
        List<StockVidrio> vidriosBajos = stockVidrioService.findLowStockItems(umbralStock);
        List<StockMaterial> materialesBajos = stockMaterialService.findLowStockItems(umbralStock);
        int totalItemsBajos = vidriosBajos.size() + materialesBajos.size();
        return ResponseEntity.ok(Map.of("lowStockItemCount", totalItemsBajos));
    }

    // --- 4. AÑADIR ESTE NUEVO ENDPOINT ---
    /**
     * Endpoint (solo ADMIN) para forzar la revisión de stock bajo y enviar
     * las alertas por correo electrónico.
     */
    @PostMapping("/trigger-notification-check")
    public ResponseEntity<String> triggerNotificationCheck() {
        try {
            // Llama manualmente al método que envía los correos
            notificationService.checkForLowStock();
            return ResponseEntity.ok("Revisión de stock bajo iniciada y correos enviados (si aplica).");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al ejecutar la revisión: " + e.getMessage());
        }
    }
}