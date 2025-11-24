package com.vidrieria.ServiceProduct.infrastructure.storage;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    // Spring inyecta automáticamente el Bean de Cloudinary que creamos en CloudinaryConfig
    @Autowired
    private Cloudinary cloudinary;

    public String uploadFile(MultipartFile file, String folderName) throws IOException {
        // Verifica que el archivo no esté vacío
        if (file == null || file.isEmpty()) {
            throw new IOException("El archivo para subir está vacío o es nulo.");
        }

        // Prepara las opciones de subida para Cloudinary
        Map<String, Object> options = ObjectUtils.asMap(
                "folder", folderName,          
                "resource_type", "auto"      
        );

        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), options);

        // Cloudinary devuelve un mapa con información sobre el archivo subido.
        // Extraemos la URL segura (https), que es la que guardaremos en la base de datos.
        String secureUrl = (String) uploadResult.get("secure_url");
        if (secureUrl == null) {
            throw new IOException("No se pudo obtener la URL segura de Cloudinary después de la subida.");
        }

        return secureUrl;
    }

    public void deleteFile(String publicId) throws IOException {
        // Llama al método destroy de Cloudinary para eliminar el recurso
        // ObjectUtils.emptyMap() se usa si no necesitas opciones adicionales para la eliminación
        cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }

    public String extractPublicIdFromUrl(String secureUrl) {
        if (secureUrl == null || !secureUrl.contains("/upload/")) {
            return null; // O lanzar una excepción si la URL no es válida
        }
        // Encuentra la parte después de /upload/
        String afterUpload = secureUrl.split("/upload/")[1];
        // Quita la versión (vXXXXXXXXXX/) si existe
        String withoutVersion = afterUpload.substring(afterUpload.indexOf("/") + 1);
        // Quita la extensión del archivo al final
        String publicIdWithFolder = withoutVersion.substring(0, withoutVersion.lastIndexOf('.'));
        return publicIdWithFolder;
    }
}