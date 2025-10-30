import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import ClientProductService from '../../services/ClientProductService';
import './Products.css';

const Products = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Cargando productos desde la base de datos...');
      
      const productsData = await ClientProductService.getActiveProducts();
      console.log('✅ Productos cargados:', productsData);
      
      setProducts(productsData);
    } catch (err) {
      console.error('❌ Error cargando productos:', err);
      setError('No se pudieron cargar los productos. Verifica que el servidor esté ejecutándose.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    // Adaptar el producto al formato que espera tu carrito
    const cartProduct = {
      id: product.id,
      name: product.nombre,
      price: product.precio,
      stock: product.stock,
      category: typeof product.categoria === 'object' ? product.categoria.nombre : product.categoria,
      image: product.imagen || 'https://via.placeholder.com/300x300?text=Imagen+No+Disponible'
    };
    
    addToCart(cartProduct);
    
    // Feedback visual mejorado
    const buttons = document.querySelectorAll(`[data-product-id="${product.id}"]`);
    buttons.forEach(button => {
      const originalText = button.textContent;
      const originalBackground = button.style.background;
      
      button.textContent = '¡Añadido!';
      button.style.background = '#4caf50';
      button.disabled = true;
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = originalBackground;
        button.disabled = false;
      }, 1500);
    });
  };

  // Función para formatear precio
  const formatPrice = (price) => {
    return `$${price?.toLocaleString('es-CL') || '0'}`;
  };

  // Función para obtener nombre de categoría
  const getCategoryName = (categoria) => {
    if (typeof categoria === 'object' && categoria !== null) {
      return categoria.nombre;
    }
    return categoria || 'Sin categoría';
  };

  return (
    <section id="products">
      <div className="container">
        <h2 className="section-title">Nuestros Productos</h2>
        
        {/* Estado de carga */}
        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Cargando productos desde la base de datos...</p>
          </div>
        )}

        {/* Estado de error */}
        {error && (
          <div className="error-state">
            <div className="error-content">
              <i className="fas fa-exclamation-triangle"></i>
              <h3>Error al cargar productos</h3>
              <p>{error}</p>
              <button onClick={loadProducts} className="btn btn-retry">
                <i className="fas fa-redo"></i>
                Reintentar
              </button>
            </div>
          </div>
        )}

        {/* Contador de productos */}
        {!loading && !error && (
          <p className="products-count">
            Mostrando {products.length} producto{products.length !== 1 ? 's' : ''} 
            {products.length > 0 ? ' disponibles' : ''}
          </p>
        )}

        {/* Grid de productos */}
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img 
                  src={product.imagen || 'https://via.placeholder.com/300x300?text=Imagen+No+Disponible'} 
                  alt={product.nombre}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300?text=Imagen+No+Disponible';
                  }}
                />
                {/* Badge de stock */}
                {product.stock <= 3 && product.stock > 0 && (
                  <span className="stock-badge low-stock">¡Últimas unidades!</span>
                )}
                {product.stock === 0 && (
                  <span className="stock-badge out-of-stock">Agotado</span>
                )}
              </div>
              
              <div className="product-info">
                <h3>{product.nombre}</h3>
                <p className="product-category">{getCategoryName(product.categoria)}</p>
                
                {/* Descripción (si existe) */}
                {product.descripcion && (
                  <p className="product-description">
                    {product.descripcion.length > 100 
                      ? `${product.descripcion.substring(0, 100)}...` 
                      : product.descripcion
                    }
                  </p>
                )}
                
                <div className="product-details">
                  <div className="product-price">{formatPrice(product.precio)}</div>
                  <div className="product-stock">
                    {product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock'}
                  </div>
                </div>
                
                <button 
                  className={`btn add-to-cart ${product.stock === 0 ? 'disabled' : ''}`}
                  onClick={() => handleAddToCart(product)}
                  data-product-id={product.id}
                  disabled={product.stock === 0 || loading}
                >
                  {product.stock === 0 ? 'Agotado' : 'Añadir al carrito'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Estado vacío */}
        {!loading && !error && products.length === 0 && (
          <div className="empty-state">
            <i className="fas fa-box-open"></i>
            <h3>No hay productos disponibles</h3>
            <p>No se encontraron productos activos en la base de datos.</p>
            <button onClick={loadProducts} className="btn">
              <i className="fas fa-redo"></i>
              Reintentar
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;