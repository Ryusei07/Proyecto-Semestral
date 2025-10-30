import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import ClientProductService from '../../services/ClientProductService';
import './Products.css';

const Products = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, products]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Cargando productos desde la base de datos...');
      
      const productsData = await ClientProductService.getActiveProducts();
      console.log('✅ Productos cargados:', productsData);
      
      setProducts(productsData);
      extractCategories(productsData);
    } catch (err) {
      console.error('❌ Error cargando productos:', err);
      setError('No se pudieron cargar los productos. Verifica que el servidor esté ejecutándose.');
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const extractCategories = (productsData) => {
    // Extraer categorías únicas de los productos
    const uniqueCategories = new Set();
    
    productsData.forEach(product => {
      const categoryName = getCategoryName(product.categoria);
      if (categoryName) {
        uniqueCategories.add(categoryName);
      }
    });

    const categoriesArray = Array.from(uniqueCategories).sort();
    setCategories(categoriesArray);
    console.log('📊 Categorías encontradas:', categoriesArray);
  };

  const filterProducts = () => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        getCategoryName(product.categoria) === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (product) => {
    const cartProduct = {
      id: product.id,
      name: product.nombre,
      price: product.precio,
      stock: product.stock,
      category: getCategoryName(product.categoria),
      image: product.imagen || 'https://via.placeholder.com/300x300?text=Imagen+No+Disponible'
    };
    
    addToCart(cartProduct);
    
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

  const formatPrice = (price) => {
    return `$${price?.toLocaleString('es-CL') || '0'}`;
  };

  const getCategoryName = (categoria) => {
    if (typeof categoria === 'object' && categoria !== null) {
      return categoria.nombre;
    }
    return categoria || 'Sin categoría';
  };

  const getProductCountByCategory = (category) => {
    if (category === 'all') return products.length;
    return products.filter(product => 
      getCategoryName(product.categoria) === category
    ).length;
  };

  return (
    <section id="products">
      <div className="container">
        <h2 className="section-title">Nuestros Productos</h2>
        
        {/* Filtros por categoría */}
        <div className="category-filters">
          <div className="filters-header">
            <h3>Filtrar por categoría</h3>
            <span className="products-count">
              {getProductCountByCategory(selectedCategory)} producto{getProductCountByCategory(selectedCategory) !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="category-buttons">
            <button
              className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('all')}
            >
              <span className="category-name">Todos</span>
              <span className="product-count">{products.length}</span>
            </button>
            
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                <span className="category-name">{category}</span>
                <span className="product-count">
                  {getProductCountByCategory(category)}
                </span>
              </button>
            ))}
          </div>
        </div>

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

        {/* Grid de productos */}
        <div className="products-grid">
          {filteredProducts.map(product => (
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

        {/* Estado vacío con filtro aplicado */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="empty-state">
            <i className="fas fa-search"></i>
            <h3>
              {selectedCategory === 'all' 
                ? 'No hay productos disponibles' 
                : `No hay productos en la categoría "${selectedCategory}"`
              }
            </h3>
            <p>
              {selectedCategory === 'all'
                ? 'No se encontraron productos activos en la base de datos.'
                : 'Intenta con otra categoría o vuelve a "Todos"'
              }
            </p>
            {selectedCategory !== 'all' && (
              <button 
                onClick={() => handleCategoryChange('all')} 
                className="btn"
              >
                <i className="fas fa-list"></i>
                Ver todos los productos
              </button>
            )}
            <button onClick={loadProducts} className="btn btn-secondary">
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