package com.shibuyastore.shibuyastorebackend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String contrasena; // Guardará el hash encriptado 

    @Column(nullable = false)
    private String rol; // "cliente", "vendedor", "super-admin" 

    @Column(nullable = false)
    private String estado; // "activo", "inactivo" 

    @CreationTimestamp // Fecha automática al crear 
    @Column(updatable = false)
    private LocalDateTime fechaCreacion;
}
