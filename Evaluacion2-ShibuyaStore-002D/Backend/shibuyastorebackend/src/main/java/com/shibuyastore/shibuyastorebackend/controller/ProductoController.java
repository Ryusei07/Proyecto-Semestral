package com.shibuyastore.shibuyastorebackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.shibuyastore.shibuyastorebackend.model.Producto;
import com.shibuyastore.shibuyastorebackend.service.FileStorageService;
import com.shibuyastore.shibuyastorebackend.service.ProductoService;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*") // Permite la conexión desde React
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @Autowired
    private FileStorageService fileStorageService;

    // CRUD: Crear
    @PostMapping
    public ResponseEntity<Producto> createProducto(@RequestBody Producto producto) {
        Producto nuevoProducto = productoService.createProducto(producto);
        return new ResponseEntity<>(nuevoProducto, HttpStatus.CREATED);
    }

    // CRUD: Leer todos
    @GetMapping
    public List<Producto> getAllProductos() {
        return productoService.getAllProductos();
    }
    
    // CRUD: Leer por ID
    @GetMapping("/{id}")
    public ResponseEntity<Producto> getProductoById(@PathVariable Long id) {
        return productoService.getProductoById(id)
                .map(ResponseEntity::ok) // Si lo encuentra, devuelve 200 OK
                .orElse(ResponseEntity.notFound().build()); // Si no, devuelve 404 Not Found
    }

    // CRUD: Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<Producto> updateProducto(@PathVariable Long id, @RequestBody Producto productoDetalles) {
        try {
            Producto productoActualizado = productoService.updateProducto(id, productoDetalles);
            return ResponseEntity.ok(productoActualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build(); // Devuelve 404 si el ID no existe
        }
    }

    // CRUD: Eliminar (Inhabilitar)
    @DeleteMapping("/{id}")
    public ResponseEntity<Producto> deleteProducto(@PathVariable Long id) {
         try {
            Producto productoInactivo = productoService.deleteProducto(id);
            return ResponseEntity.ok(productoInactivo); // Devuelve el producto con estado "inactivo"
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build(); // Devuelve 404 si el ID no existe
        }
    }

    // Endpoint para subir imagen
    @PostMapping("/{id}/imagen")
    public ResponseEntity<?> uploadImagen(
            @PathVariable Long id, 
            @RequestParam("file") MultipartFile file) {
        
        Producto producto = productoService.getProductoById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        String filePath = fileStorageService.storeFile(file);
        
        producto.setImagen(filePath); // Guardamos la ruta en el producto
        productoService.updateProducto(id, producto); // Actualizamos
        
        return ResponseEntity.ok().body(filePath);
    }
}