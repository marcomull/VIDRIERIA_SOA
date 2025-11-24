package com.vidrieria.ServiceProduct.presentation.mediaController;

import com.vidrieria.ServiceProduct.infrastructure.storage.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/media")
public class MediaController {

    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile file, 
            @RequestParam(value = "folder", defaultValue = "general") String folder) { 

        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "El archivo no puede estar vacío."));
        }

        try {
            String fileUrl = cloudinaryService.uploadFile(file, folder);

            return ResponseEntity.ok(Map.of("url", fileUrl));

        } catch (IOException e) {
            System.err.println("Error al subir archivo a Cloudinary: " + e.getMessage()); // Log simple
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "No se pudo guardar el archivo: " + e.getMessage()));
        } catch (Exception e) {
            System.err.println("Error inesperado en uploadFile: " + e.getMessage()); // Log simple
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Ocurrió un error inesperado durante la subida."));
        }
    }

    // --- Endpoint Opcional para Borrar (si lo necesitas) ---
    /*
    @DeleteMapping("/delete") // Se accede vía DELETE /media/delete?publicId=folder/file_id
    public ResponseEntity<?> deleteFile(@RequestParam("publicId") String publicId) {
        if (publicId == null || publicId.trim().isEmpty()) {
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "El publicId es requerido."));
        }
        try {
            cloudinaryService.deleteFile(publicId);
            return ResponseEntity.ok(Map.of("message", "Archivo eliminado correctamente."));
        } catch (IOException e) {
            System.err.println("Error al eliminar archivo de Cloudinary: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(Map.of("error", "No se pudo eliminar el archivo: " + e.getMessage()));
        } catch (Exception e) {
             System.err.println("Error inesperado en deleteFile: " + e.getMessage());
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                  .body(Map.of("error", "Ocurrió un error inesperado durante la eliminación."));
        }
    }
    */
}