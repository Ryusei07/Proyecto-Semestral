package com.shibuyastore.shibuyastorebackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shibuyastore.shibuyastorebackend.model.Categoria;
import com.shibuyastore.shibuyastorebackend.repository.CategoriaRepository;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*") // Permite la conexión desde React
public class CategoriaController {

    // 1. Inyecta el repositorio de categorías (que ya creamos)
    @Autowired
    private CategoriaRepository categoriaRepository;

    // 2. Crea el endpoint GET que React necesita
    @GetMapping
    public List<Categoria> getAllCategorias() {
        // Simplemente busca y devuelve todas las categorías de la BD
        return categoriaRepository.findAll();
    }
}

