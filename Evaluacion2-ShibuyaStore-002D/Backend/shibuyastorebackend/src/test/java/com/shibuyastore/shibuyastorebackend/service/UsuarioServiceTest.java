package com.shibuyastore.shibuyastorebackend.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.shibuyastore.shibuyastorebackend.dto.UsuarioDTO;
import com.shibuyastore.shibuyastorebackend.model.Usuario;
import com.shibuyastore.shibuyastorebackend.repository.UsuarioRepository;

import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UsuarioServiceTest { 

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UsuarioService usuarioService;

    @Test
    void testCreateUsuario_EncriptaPassword() {
        // Arrange
        UsuarioDTO dto = new UsuarioDTO();
        dto.setNombre("Test User");
        dto.setEmail("test@mail.com");
        dto.setContrasena("pass123");
        dto.setRol("cliente");

        when(passwordEncoder.encode("pass123")).thenReturn("hashed_password");
        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(i -> i.getArguments()[0]);

        // Act
        Usuario resultado = usuarioService.createUsuario(dto);

        // Assert
        assertEquals("Test User", resultado.getNombre());
        assertEquals("hashed_password", resultado.getContrasena());
        assertEquals("activo", resultado.getEstado());
        verify(passwordEncoder, times(1)).encode("pass123");
    }

    @Test
    void testLogin_Exitoso() {
        // Arrange
        Usuario usuarioMock = new Usuario();
        usuarioMock.setEmail("admin@mail.com");
        usuarioMock.setContrasena("hashed_password");
        usuarioMock.setEstado("activo");

        when(usuarioRepository.findByEmail("admin@mail.com")).thenReturn(Optional.of(usuarioMock));
        when(passwordEncoder.matches("pass123", "hashed_password")).thenReturn(true);

        // Act
        Optional<Usuario> resultado = usuarioService.login("admin@mail.com", "pass123");

        // Assert
        assertTrue(resultado.isPresent());
        assertEquals("admin@mail.com", resultado.get().getEmail());
    }

    @Test
    void testLogin_UsuarioInactivo() {
        // Arrange
        Usuario usuarioMock = new Usuario();
        usuarioMock.setEmail("admin@mail.com");
        usuarioMock.setContrasena("hashed_password");
        usuarioMock.setEstado("inactivo"); // Usuario inactivo

        when(usuarioRepository.findByEmail("admin@mail.com")).thenReturn(Optional.of(usuarioMock));
        // No se debe llamar a passwordEncoder.matches si está inactivo

        // Act
        Optional<Usuario> resultado = usuarioService.login("admin@mail.com", "pass123");

        // Assert
        assertFalse(resultado.isPresent());
    }
}
