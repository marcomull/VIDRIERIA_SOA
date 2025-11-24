package com.vidrieria.ServiceInventariado.application.applicationServices;

import com.vidrieria.ServiceInventariado.domain.interfaceService.IStockMaterialService;
import com.vidrieria.ServiceInventariado.domain.interfaceService.IStockVidrioService;
import com.vidrieria.ServiceInventariado.domain.model.StockMaterial;
import com.vidrieria.ServiceInventariado.domain.model.StockVidrio;
// --- IMPORTS AÑADIDOS ---
import com.vidrieria.ServiceInventariado.infrastructure.client.UsuarioServiceClient;
import com.vidrieria.ServiceInventariado.application.dto.UsuarioEmailDto;
import java.util.Arrays;
// --- FIN IMPORTS AÑADIDOS ---
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private IStockVidrioService stockVidrioService;

    @Autowired
    private IStockMaterialService stockMaterialService;

    @Autowired
    private EmailSenderService emailSenderService;

    // --- AÑADIR ESTE CLIENTE ---
    @Autowired
    private UsuarioServiceClient usuarioServiceClient;

    @Value("${inventario.notificacion.umbral-stock}")
    private int umbralStock;

    @Scheduled(cron = "0 0 8 * * ?")
    public void checkForLowStock() {
        System.out.println("Ejecutando revisión de bajo stock...");

        List<StockVidrio> vidriosBajos = stockVidrioService.findLowStockItems(umbralStock);
        List<StockMaterial> materialesBajos = stockMaterialService.findLowStockItems(umbralStock);

        if (!vidriosBajos.isEmpty() || !materialesBajos.isEmpty()) {
            // ¡Llama al método modificado!
            sendLowStockEmailToAdmins(vidriosBajos, materialesBajos);
        } else {
            System.out.println("No se encontraron items con bajo stock.");
        }
    }

    // --- MÉTODO MODIFICADO ---
    private void sendLowStockEmailToAdmins(List<StockVidrio> vidrios, List<StockMaterial> materiales) {

        // 1. Construir el cuerpo del mensaje (igual que antes)
        StringBuilder body = new StringBuilder("Alerta de Bajo Stock:\n\n");
        if (!vidrios.isEmpty()) {
            body.append("Vidrios con stock bajo (<= ").append(umbralStock).append("):\n");
            vidrios.forEach(v -> body.append("- ID Vidrio: ").append(v.getIdVidrio())
                    .append(", ID Stock: ").append(v.getIdStockVidrio())
                    .append(", Medidas: ").append(v.getAncho()).append("x").append(v.getAlto()).append("x").append(v.getEspesor())
                    .append(", Cantidad: ").append(v.getCantidad())
                    .append(v.getEsRetazo() ? " (Retazo)" : "")
                    .append("\n"));
            body.append("\n");
        }
        if (!materiales.isEmpty()) {
            body.append("Materiales con stock bajo (<= ").append(umbralStock).append("):\n");
            materiales.forEach(m -> body.append("- ID Material: ").append(m.getIdMaterial())
                    .append(", ID Stock: ").append(m.getIdStockMaterial())
                    .append(", Largo: ").append(m.getLargo())
                    .append(", Cantidad: ").append(m.getCantidad())
                    .append(m.getEsRetazo() ? " (Retazo)" : "")
                    .append("\n"));
        }
        String emailBody = body.toString();
        String subject = "Alerta de Bajo Stock - Vidriería";

        // 2. Obtener la lista de usuarios (ADMIN y ALMACEN) desde api-usuarios (8080)
        List<String> roles = Arrays.asList("ADMIN", "ALMACEN");
        List<UsuarioEmailDto> usuariosANotificar = usuarioServiceClient.getUsuariosPorRoles(roles);

        if(usuariosANotificar.isEmpty()){
            System.err.println("ALERTA DE STOCK: No se encontraron usuarios (ADMIN/ALMACEN) para notificar.");
            return;
        }

        // 3. Enviar el email a cada usuario encontrado
        System.out.println("Enviando " + usuariosANotificar.size() + " alertas de stock bajo...");
        for (UsuarioEmailDto usuario : usuariosANotificar) {
            emailSenderService.sendSimpleMessage(usuario.getCorreo(), subject, emailBody);
        }
    }
}