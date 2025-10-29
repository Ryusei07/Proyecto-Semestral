package com.shibuyastore.shibuyastorebackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.shibuyastore.shibuyastorebackend.dto.UsuarioDTO;
import com.shibuyastore.shibuyastorebackend.model.Usuario;
import com.shibuyastore.shibuyastorebackend.repository.UsuarioRepository;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // CRUD: Obtener todos
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    // CRUD: Obtener por ID
    public Optional<Usuario> getUsuarioById(Long id) {
        return usuarioRepository.findById(id);
    }

    // CRUD: Crear
    public Usuario createUsuario(UsuarioDTO usuarioDTO) {
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombre(usuarioDTO.getNombre());
        nuevoUsuario.setEmail(usuarioDTO.getEmail());
        nuevoUsuario.setRol(usuarioDTO.getRol());
        nuevoUsuario.setEstado("activo"); // Estado por defecto
        
        // Encriptar contraseña
        nuevoUsuario.setContrasena(passwordEncoder.encode(usuarioDTO.getContrasena()));
        
        return usuarioRepository.save(nuevoUsuario);
    }

    // CRUD: Actualizar
    public Usuario updateUsuario(Long id, UsuarioDTO usuarioDTO) {
        Usuario usuarioExistente = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        usuarioExistente.setNombre(usuarioDTO.getNombre());
        usuarioExistente.setEmail(usuarioDTO.getEmail());
        usuarioExistente.setRol(usuarioDTO.getRol());

        // Opcional: actualizar contraseña solo si se provee una nueva
        if (usuarioDTO.getContrasena() != null && !usuarioDTO.getContrasena().isEmpty()) {
            usuarioExistente.setContrasena(passwordEncoder.encode(usuarioDTO.getContrasena()));
        }
        
        return usuarioRepository.save(usuarioExistente);
    }

    // CRUD: Inhabilitar (Eliminación lógica)
    public Usuario deleteUsuario(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        usuario.setEstado("inactivo"); // Cambia el estado
        return usuarioRepository.save(usuario);
    }

    // Autenticación Simple
    public Optional<Usuario> login(String email, String contrasena) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);

        // Si el usuario existe Y su estado es "activo"
        if (usuarioOpt.isPresent() && usuarioOpt.get().getEstado().equals("activo")) {
            Usuario usuario = usuarioOpt.get();
            // Comparamos la contraseña enviada con la encriptada en la BD
            if (passwordEncoder.matches(contrasena, usuario.getContrasena())) {
                return usuarioOpt;
            }
        }
        return Optional.empty(); // Falla si no existe, está inactivo o la pass es incorrecta
    }
}
