// Servicio expandido para dashboard y estadísticas
const API_BASE_URL = 'http://localhost:8080/api';

class ProductService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    console.log(`🔄 Haciendo petición ${options.method || 'GET'} a: ${url}`);
    
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(url, config);
      
      console.log(`✅ Respuesta recibida: ${response.status}`);
      
      if (!response.ok) {
        // Intentar obtener el mensaje de error del backend
        let errorMessage = `Error HTTP: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
          console.log('🔍 Mensaje de error del backend:', errorData);
        } catch (e) {
          // Si no se puede parsear la respuesta como JSON
          console.log('🔍 No se pudo obtener mensaje de error del backend');
        }
        throw new Error(errorMessage);
      }
      
      if (response.status === 204) {
        return { success: true, message: 'Operación exitosa' };
      }
      
      return await response.json();
    } catch (error) {
      console.error('❌ Error de conexión:', error.message);
      throw error;
    }
  }

  // Obtener todos los productos
  async getAllProducts() {
    try {
      console.log('🔄 Obteniendo productos del backend...');
      const products = await this.request('/productos');
      console.log(`✅ ${products.length} productos obtenidos de la base de datos`);
      return products;
    } catch (error) {
      console.log('🚫 No se pudo conectar con el backend, usando datos de demostración...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return this.getDemoProducts();
    }
  }

  // Crear producto - VERSIÓN CORREGIDA
 async createProduct(productData) {
  try {
    console.log('🎯 ========== INICIANDO CREACIÓN DE PRODUCTO ==========');
    console.log('📥 Datos recibidos del formulario:', productData);
    
    // ✅ ESTRUCTURA CORREGIDA - Envía objeto categoria completo
    const payload = {
      nombre: productData.nombre,
      descripcion: productData.descripcion,
      precio: productData.precio,
      stock: productData.stock,
      categoria: {
        id: productData.categoria?.id || productData.categoria // ✅ Objeto con id
      },
      imagen: productData.imagen || '',
      activo: productData.activo !== false
    };

    console.log('📦 Enviando payload CORREGIDO:', JSON.stringify(payload, null, 2));
    
    const response = await this.request('/productos', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    
    console.log('✅ Producto creado exitosamente!');
    return response;
    
  } catch (error) {
    console.error('❌ Error creando producto:', error);
    throw new Error('No se pudo crear el producto: ' + error.message);
  }
}

  // Actualizar producto - VERSIÓN CORREGIDA
async updateProduct(id, productData) {
  try {
    console.log('✏️ Actualizando producto:', id, productData);
    
    // ✅ ESTRUCTURA CORREGIDA - Envía objeto categoria completo
    const payload = {
      nombre: productData.nombre,
      descripcion: productData.descripcion,
      precio: productData.precio,
      stock: productData.stock,
      categoria: {
        id: productData.categoria?.id || productData.categoria // ✅ Objeto con id
      },
      imagen: productData.imagen || '',
      activo: productData.activo !== false
    };
    
    console.log('📦 Enviando payload para actualizar:', JSON.stringify(payload, null, 2));
    
    const response = await this.request(`/productos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    
    console.log('✅ Producto actualizado exitosamente!');
    return response;
    
  } catch (error) {
    console.error(`❌ Error actualizando producto ${id}:`, error);
    throw new Error('Error al actualizar producto: ' + error.message);
  }
}
  // Eliminar producto
  async deleteProduct(id) {
    try {
      console.log('🗑️ Eliminando producto:', id);
      const result = await this.request(`/productos/${id}`, {
        method: 'DELETE',
      });
      console.log('✅ Producto eliminado del backend:', result);
      return result;
    } catch (error) {
      console.error(`❌ Error eliminando producto ${id}:`, error);
      throw new Error('Error al eliminar producto: ' + error.message);
    }
  }

  // Obtener estadísticas del dashboard
  async getDashboardStats() {
    try {
      console.log('📊 Obteniendo estadísticas del dashboard...');
      
      // Obtener todos los productos para calcular estadísticas
      const products = await this.getAllProducts();
      
      // Calcular estadísticas
      const totalProducts = products.length;
      const activeProducts = products.filter(p => p.activo !== false).length;
      const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 5).length;
      const outOfStockProducts = products.filter(p => p.stock === 0).length;
      const totalStockValue = products.reduce((sum, product) => sum + (product.precio * product.stock), 0);
      
      // Productos por categoría
      const productsByCategory = {};
      products.forEach(product => {
        const categoryName = typeof product.categoria === 'object' 
          ? product.categoria.nombre 
          : product.categoria || 'Sin categoría';
        
        if (!productsByCategory[categoryName]) {
          productsByCategory[categoryName] = 0;
        }
        productsByCategory[categoryName]++;
      });

      // Productos críticos (stock bajo)
      const criticalProducts = products
        .filter(p => p.stock <= 3)
        .slice(0, 10)
        .map(p => ({
          id: p.id,
          nombre: p.nombre,
          stock: p.stock,
          categoria: typeof p.categoria === 'object' ? p.categoria.nombre : p.categoria,
          status: p.stock === 0 ? 'out-of-stock' : 'critical'
        }));

      const stats = {
        totalProducts,
        activeProducts,
        lowStockProducts,
        outOfStockProducts,
        totalStockValue,
        productsByCategory,
        criticalProducts,
        lastUpdated: new Date().toISOString()
      };

      console.log('📈 Estadísticas calculadas:', stats);
      return stats;

    } catch (error) {
      console.log('🚫 Usando estadísticas de demostración...');
      return this.getDemoStats();
    }
  }

  // Obtener actividad reciente
  async getRecentActivity() {
    try {
      const products = await this.getAllProducts();
      
      const recentActivity = [
        {
          id: 1,
          type: 'system',
          message: `Sistema sincronizado - ${products.length} productos cargados`,
          time: 'Hace unos momentos',
          icon: 'fas fa-sync-alt'
        },
        {
          id: 2,
          type: 'products',
          message: `${products.filter(p => p.stock <= 3).length} productos necesitan atención de stock`,
          time: 'Hace unos momentos',
          icon: 'fas fa-exclamation-triangle'
        },
        {
          id: 3,
          type: 'categories',
          message: `Productos distribuidos en ${new Set(products.map(p => 
            typeof p.categoria === 'object' ? p.categoria.nombre : p.categoria
          )).size} categorías`,
          time: 'Hace unos momentos',
          icon: 'fas fa-tags'
        }
      ];

      return recentActivity;

    } catch (error) {
      return this.getDemoActivity();
    }
  }

  // Datos de demostración
  getDemoProducts() {
    return [
      {
        id: 1,
        nombre: "Naruto Uzumaki - Modo Sabio",
        descripcion: "Figura coleccionable premium de Naruto Uzumaki",
        precio: 29990,
        stock: 15,
        categoria: { id: 2, nombre: "Naruto Shippuden" },
        imagen: "https://via.placeholder.com/150/007bff/ffffff?text=Naruto",
        activo: true
      },
      {
        id: 2,
        nombre: "Goku Super Saiyan Blue",
        descripcion: "Figura de Goku transformación Super Saiyan Blue",
        precio: 34990,
        stock: 8,
        categoria: { id: 1, nombre: "Dragon Ball Z" },
        imagen: "https://via.placeholder.com/150/dc3545/ffffff?text=Goku",
        activo: true
      }
    ];
  }

  getDemoStats() {
    const demoProducts = this.getDemoProducts();
    
    return {
      totalProducts: demoProducts.length,
      activeProducts: demoProducts.filter(p => p.activo !== false).length,
      lowStockProducts: demoProducts.filter(p => p.stock > 0 && p.stock <= 5).length,
      outOfStockProducts: demoProducts.filter(p => p.stock === 0).length,
      totalStockValue: demoProducts.reduce((sum, p) => sum + (p.precio * p.stock), 0),
      productsByCategory: {
        "Naruto Shippuden": 1,
        "Dragon Ball Z": 1
      },
      criticalProducts: demoProducts.filter(p => p.stock <= 3).map(p => ({
        id: p.id,
        nombre: p.nombre,
        stock: p.stock,
        categoria: typeof p.categoria === 'object' ? p.categoria.nombre : p.categoria,
        status: p.stock === 0 ? 'out-of-stock' : 'critical'
      })),
      lastUpdated: new Date().toISOString()
    };
  }

  getDemoActivity() {
    return [
      {
        id: 1,
        type: 'system',
        message: 'Sistema en modo demostración',
        time: 'Ahora',
        icon: 'fas fa-info-circle'
      },
      {
        id: 2,
        type: 'products',
        message: 'Mostrando datos de ejemplo',
        time: 'Ahora',
        icon: 'fas fa-database'
      }
    ];
  }
}

export default new ProductService();