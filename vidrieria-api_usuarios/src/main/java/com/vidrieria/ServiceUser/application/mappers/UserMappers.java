package com.vidrieria.ServiceUser.application.mappers;

import com.vidrieria.ServiceUser.application.dto.UsuarioDTO;
import com.vidrieria.ServiceUser.application.dto.UsuarioKardexDTO;
import com.vidrieria.ServiceUser.domain.model.Usuario;
import org.springframework.stereotype.Component;
import com.vidrieria.ServiceUser.application.dto.AdminUsuarioUpdateDTO;
import com.vidrieria.ServiceUser.application.dto.ClienteUsuarioUpdateDTO;
import java.time.LocalDateTime;

@Component
public class UserMappers {

    // List Usuario
    public UsuarioDTO toDTO(Usuario usuario) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setIdUsuario(usuario.getIdUsuario());
        dto.setNombre(usuario.getNombre());
        dto.setApellido(usuario.getApellido());
        dto.setCorreo(usuario.getCorreo());
        dto.setTelefono(usuario.getTelefono());
        dto.setDni(usuario.getDni());
        dto.setRuc(usuario.getRuc());
        dto.setDireccion(usuario.getDireccion());
        dto.setRol(usuario.getRol().toString());
        dto.setFechaRegistro(usuario.getFechaRegistro());
        return dto;
    }

    //Add Usuario
    public Usuario toEntity(UsuarioDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setIdUsuario(dto.getIdUsuario());
        usuario.setNombre(dto.getNombre());
        usuario.setApellido(dto.getApellido());
        usuario.setCorreo(dto.getCorreo());
        usuario.setContrasena(dto.getContrasena());
        usuario.setTelefono(dto.getTelefono());
        usuario.setDni(dto.getDni());
        usuario.setRuc(dto.getRuc());
        usuario.setDireccion(dto.getDireccion());
        usuario.setRol(Usuario.Rol.CLIENTE);
        usuario.setFechaRegistro(LocalDateTime.now());
        return usuario;
    }

    //Delete Usuario
    public Usuario toEntityForDeletion(UsuarioDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setIdUsuario(dto.getIdUsuario());
        return usuario;
    }

    // actualizacion de administrador
    public Usuario fromAdminUpdateDTO(AdminUsuarioUpdateDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setNombre(dto.getNombre());
        usuario.setApellido(dto.getApellido());
        usuario.setCorreo(dto.getCorreo());
        usuario.setTelefono(dto.getTelefono());
        usuario.setDni(dto.getDni());
        usuario.setRuc(dto.getRuc());
        usuario.setDireccion(dto.getDireccion());
        if (dto.getRol() != null) {
            usuario.setRol(Usuario.Rol.valueOf(dto.getRol().toUpperCase()));
        }
        return usuario;
    }

    // actualización del Cliente
    public Usuario fromClienteUpdateDTO(ClienteUsuarioUpdateDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setNombre(dto.getNombre());
        usuario.setApellido(dto.getApellido());
        usuario.setCorreo(dto.getCorreo());
        usuario.setTelefono(dto.getTelefono());
        usuario.setDni(dto.getDni());
        usuario.setRuc(dto.getRuc());
        usuario.setDireccion(dto.getDireccion());
        usuario.setContrasena(dto.getContrasena());
        return usuario;
    }

    public Usuario employeeDtoToEntity(UsuarioDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setNombre(dto.getNombre());
        usuario.setApellido(dto.getApellido());
        usuario.setCorreo(dto.getCorreo());
        usuario.setTelefono(dto.getTelefono());
        usuario.setContrasena(null);
        usuario.setDni(dto.getDni());
        usuario.setRuc(dto.getRuc());
        usuario.setDireccion(dto.getDireccion());
        usuario.setFechaRegistro(LocalDateTime.now());
        if (dto.getRol() != null && !dto.getRol().equalsIgnoreCase("CLIENTE")) {
            try {
                usuario.setRol(Usuario.Rol.valueOf(dto.getRol().toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("El rol especificado '" + dto.getRol() + "' no es válido.");
            }
        } else {
            throw new IllegalArgumentException("Se debe especificar un rol de empleado válido (VENDEDOR, TALLER, ALMACEN).");
        }
        usuario.setActivo(true);
        usuario.setVerificado(true);
        return usuario;
    }

    public UsuarioKardexDTO toKardexDTO(Usuario usuario) {
        UsuarioKardexDTO dto = new UsuarioKardexDTO();
        dto.setIdUsuario(usuario.getIdUsuario());
        dto.setNombreCompleto(usuario.getNombre() + " " + usuario.getApellido());
        return dto;
    }
}
