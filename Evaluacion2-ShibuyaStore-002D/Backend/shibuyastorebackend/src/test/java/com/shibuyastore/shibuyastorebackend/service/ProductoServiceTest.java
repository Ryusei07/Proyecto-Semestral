package com.shibuyastore.shibuyastorebackend.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.shibuyastore.shibuyastorebackend.model.Producto;
import com.shibuyastore.shibuyastorebackend.repository.ProductoRepository;

import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductoServiceTest { 

    @Mock
    private ProductoRepository productoRepository;

    @InjectMocks
    private ProductoService productoService;

    @Test
    void testGetProductoById_Encontrado() {
        // Arrange
        Producto productoMock = new Producto();
        productoMock.setId(1L);
        productoMock.setNombre("Goku");
        when(productoRepository.findById(1L)).thenReturn(Optional.of(productoMock));

        // Act
        Optional<Producto> resultado = productoService.getProductoById(1L);

        // Assert
        assertTrue(resultado.isPresent());
        assertEquals("Goku", resultado.get().getNombre());
    }

    @Test
    void testGetProductoById_NoEncontrado() {
        // Arrange
        when(productoRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        Optional<Producto> resultado = productoService.getProductoById(1L);

        // Assert
        assertFalse(resultado.isPresent());
    }

    @Test
    void testCreateProducto_GuardaCorrectamente() {
        // Arrange
        Producto productoNuevo = new Producto();
        productoNuevo.setNombre("Luffy");
        
        when(productoRepository.save(any(Producto.class))).thenAnswer(i -> i.getArguments()[0]);

        // Act
        Producto resultado = productoService.createProducto(productoNuevo);

        // Assert
        assertEquals("Luffy", resultado.getNombre());
        assertEquals("activo", resultado.getEstado());
        verify(productoRepository, times(1)).save(productoNuevo);
    }
}
