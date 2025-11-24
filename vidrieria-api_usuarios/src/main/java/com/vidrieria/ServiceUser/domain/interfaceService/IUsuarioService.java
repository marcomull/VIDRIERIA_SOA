package com.vidrieria.ServiceUser.domain.interfaceService;

import com.vidrieria.ServiceUser.domain.model.Usuario;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Optional;

@Component
public interface IUsuarioService {
    //INICIO SESION
    Optional<Usuario> login(String email, String password);
    //AGREGAR USUARIOS
    Usuario addUsuario(Usuario usuario);
    //LISTAR USUARIOS
    List<Usuario> getAllUsuario();
    //ELIMINAR USUARIOS
    boolean deleteUsuario(int idUser);
}