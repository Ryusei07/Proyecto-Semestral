package com.shibuyastore.shibuyastorebackend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

// Data Transfer Objects para crear y actualizar usuarios (sin exponer el modelo)
@Data
public class UsuarioDTO {

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "Formato de email inválido")
    private String email;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 4, message = "La contraseña debe tener al menos 4 caracteres")
    private String contrasena;

    @NotBlank(message = "El rol es obligatorio")
    private String rol;
    
    // Opcional: un campo estado si se puede editar
    // private String estado;
}
