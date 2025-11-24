package com.vidrieria.ServiceUser.infrastructure.repository;

import com.vidrieria.ServiceUser.domain.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IUsuarioRepository extends JpaRepository<Usuario, Integer>, JpaSpecificationExecutor<Usuario> {
    Optional<Usuario> findByCorreo(String correo);
    Optional<Usuario> findByCodigoVerificacion(String codigo);
    Optional<Usuario> findByResetPasswordToken(String token);
    List<Usuario> findAllByRolInAndActivoTrue(List<Usuario.Rol> roles);
    List<Usuario> findByIdUsuarioIn(List<Integer> ids);
}
