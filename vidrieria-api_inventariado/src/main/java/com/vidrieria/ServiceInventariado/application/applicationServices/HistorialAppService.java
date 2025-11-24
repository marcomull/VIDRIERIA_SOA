package com.vidrieria.ServiceInventariado.application.applicationServices;

import com.vidrieria.ServiceInventariado.application.dto.MovimientoMaterialDTO;
import com.vidrieria.ServiceInventariado.application.dto.MovimientoVidrioDTO;
import com.vidrieria.ServiceInventariado.application.mappers.MovimientoMaterialMapper;
import com.vidrieria.ServiceInventariado.application.mappers.MovimientoVidrioMapper;
import com.vidrieria.ServiceInventariado.domain.interfaceService.IHistorialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.vidrieria.ServiceInventariado.infrastructure.client.UsuarioServiceClient;
import com.vidrieria.ServiceInventariado.domain.model.MovimientoVidrio;
import com.vidrieria.ServiceInventariado.domain.model.MovimientoMaterial;
import java.util.Map;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HistorialAppService {

    @Autowired
    private IHistorialService historialService; // Capa de Dominio

    @Autowired
    private MovimientoVidrioMapper vidrioMapper;

    @Autowired
    private MovimientoMaterialMapper materialMapper;

    @Autowired
    private UsuarioServiceClient usuarioServiceClient;

    public List<MovimientoVidrioDTO> getHistorialVidrio(Integer idStockVidrio) {
        List<MovimientoVidrio> historial = historialService.findHistorialVidrio(idStockVidrio);

        List<Integer> idsUsuarios = historial.stream()
                .map(MovimientoVidrio::getIdUsuarioResponsable)
                .filter(id -> id != null)
                .distinct()
                .collect(Collectors.toList());

        Map<Integer, String> mapaDeNombres = usuarioServiceClient.getNombresDeUsuariosPorIds(idsUsuarios);

        return historial.stream().map(movimiento -> {
            MovimientoVidrioDTO dto = vidrioMapper.toDTO(movimiento);

            String nombre = mapaDeNombres.get(movimiento.getIdUsuarioResponsable());
            dto.setNombreUsuarioResponsable(nombre != null ? nombre : "Sistema"); // Si es nulo, fue el @Scheduled

            return dto;
        }).collect(Collectors.toList());
    }

    public List<MovimientoMaterialDTO> getHistorialMaterial(Integer idStockMaterial) {
        List<MovimientoMaterial> historial = historialService.findHistorialMaterial(idStockMaterial);

        List<Integer> idsUsuarios = historial.stream()
                .map(MovimientoMaterial::getIdUsuarioResponsable)
                .filter(id -> id != null)
                .distinct()
                .collect(Collectors.toList());

        Map<Integer, String> mapaDeNombres = usuarioServiceClient.getNombresDeUsuariosPorIds(idsUsuarios);

        return historial.stream().map(movimiento -> {
            MovimientoMaterialDTO dto = materialMapper.toDTO(movimiento);
            String nombre = mapaDeNombres.get(movimiento.getIdUsuarioResponsable());
            dto.setNombreUsuarioResponsable(nombre != null ? nombre : "Sistema");
            return dto;
        }).collect(Collectors.toList());
    }
}