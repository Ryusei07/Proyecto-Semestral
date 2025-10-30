package com.shibuyastore.shibuyastorebackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.shibuyastore.shibuyastorebackend.model.Producto;
import com.shibuyastore.shibuyastorebackend.repository.ProductoRepository;
import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    // CRUD: Obtener todos
    public List<Producto> getAllProductos() {
        return productoRepository.findAll();
    }

    // CRUD: Obtener por ID
    public Optional<Producto> getProductoById(Long id) {
        return productoRepository.findById(id);
    }

    // CRUD: Crear (recibe el objeto completo, se puede mejorar con un DTO)
    public Producto createProducto(Producto producto) {
        producto.setEstado("activo"); // Estado por defecto
        return productoRepository.save(producto);
    }

    // CRUD: Actualizar
    public Producto updateProducto(Long id, Producto productoDetalles) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        producto.setNombre(productoDetalles.getNombre());
        producto.setDescripcion(productoDetalles.getDescripcion());
        producto.setPrecio(productoDetalles.getPrecio());
        producto.setStock(productoDetalles.getStock());
        producto.setCategoria(productoDetalles.getCategoria());
        producto.setImagen(productoDetalles.getImagen());
        
        return productoRepository.save(producto);
    }

    // CRUD: Inhabilitar
    public Producto deleteProducto(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        
        producto.setEstado("inactivo");
        return productoRepository.save(producto);
    }
}