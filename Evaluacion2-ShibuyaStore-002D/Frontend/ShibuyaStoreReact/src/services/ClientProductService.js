const API_BASE_URL = 'http://localhost:8080/api';

class ClientProductService {
  // Obtener productos activos (para clientes)
  async getActiveProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/productos`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const products = await response.json();
      
      // Filtrar solo productos activos (si es necesario)
      const activeProducts = products.filter(product => 
        product.activo !== false && product.stock > 0
      );
      
      console.log('✅ Productos activos cargados:', activeProducts.length);
      return activeProducts;
      
    } catch (error) {
      console.error('❌ Error cargando productos:', error);
      // Retornar array vacío en caso de error
      return [];
    }
  }

  // Obtener productos destacados (los primeros 4 productos activos)
  async getFeaturedProducts() {
    try {
      const products = await this.getActiveProducts();
      return products.slice(0, 4); // Primeros 4 productos como destacados
    } catch (error) {
      console.error('Error cargando productos destacados:', error);
      return [];
    }
  }

  // Obtener producto por ID
  async getProductById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/productos/${id}`);
      if (!response.ok) throw new Error('Producto no encontrado');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
}

export default new ClientProductService();