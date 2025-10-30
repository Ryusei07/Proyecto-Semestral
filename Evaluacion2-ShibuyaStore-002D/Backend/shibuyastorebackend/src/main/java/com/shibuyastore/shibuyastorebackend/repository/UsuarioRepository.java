package com.shibuyastore.shibuyastorebackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.shibuyastore.shibuyastorebackend.model.Usuario;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // Método para buscar por email, necesario para el Login
    Optional<Usuario> findByEmail(String email);
}
