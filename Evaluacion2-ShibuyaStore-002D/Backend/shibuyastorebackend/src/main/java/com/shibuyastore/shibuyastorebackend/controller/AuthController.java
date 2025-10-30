package com.shibuyastore.shibuyastorebackend.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.shibuyastore.shibuyastorebackend.dto.LoginRequest;
import com.shibuyastore.shibuyastorebackend.model.Usuario;
import com.shibuyastore.shibuyastorebackend.service.UsuarioService;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Permite la conexión desde React
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    // Endpoint de Login
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        
        Optional<Usuario> usuarioOpt = usuarioService.login(
                loginRequest.getEmail(), 
                loginRequest.getContrasena()
        );

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            // Validación de rol
            if (!usuario.getRol().equals("super-admin")) {
                 return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Acceso denegado: Se requiere rol de administrador");
            }
            // Retornamos el usuario (sin contraseña)
            usuario.setContrasena(null); 
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas o usuario inactivo");
        }
    }
}