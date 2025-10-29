package com.shibuyastore.shibuyastorebackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.shibuyastore.shibuyastorebackend.model.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
}
