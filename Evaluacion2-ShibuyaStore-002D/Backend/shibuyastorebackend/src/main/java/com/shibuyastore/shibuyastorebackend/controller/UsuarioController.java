package com.shibuyastore.shibuyastorebackend.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.shibuyastore.shibuyastorebackend.dto.UsuarioDTO;
import com.shibuyastore.shibuyastorebackend.model.Usuario;
import com.shibuyastore.shibuyastorebackend.service.UsuarioService;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // CRUD: Crear
    @PostMapping
    public ResponseEntity<Usuario> createUsuario(@Valid @RequestBody UsuarioDTO usuarioDTO) {
        Usuario usuario = usuarioService.createUsuario(usuarioDTO);
        return new ResponseEntity<>(usuario, HttpStatus.CREATED);
    }

    // CRUD: Leer todos
    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioService.getAllUsuarios();
    }

    // CRUD: Leer por ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable Long id) {
        return usuarioService.getUsuarioById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // CRUD: Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable Long id, @Valid @RequestBody UsuarioDTO usuarioDTO) {
        try {
            Usuario usuarioActualizado = usuarioService.updateUsuario(id, usuarioDTO);
            return ResponseEntity.ok(usuarioActualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // CRUD: Eliminar (Inhabilitar)
    @DeleteMapping("/{id}")
    public ResponseEntity<Usuario> deleteUsuario(@PathVariable Long id) {
         try {
            Usuario usuarioInactivo = usuarioService.deleteUsuario(id);
            return ResponseEntity.ok(usuarioInactivo);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}