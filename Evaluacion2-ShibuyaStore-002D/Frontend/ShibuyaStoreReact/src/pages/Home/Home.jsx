import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import ClientProductService from '../../services/ClientProductService';
import './Home.css';

const Home = ({ setCurrentPage }) => {
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Cargando productos destacados...');
      
      const products = await ClientProductService.getFeaturedProducts();
      console.log('✅ Productos cargados:', products);
      
      setFeaturedProducts(products);
    } catch (err) {
      console.error('❌ Error:', err);
      setError('No se pudieron cargar los productos');
      setFeaturedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product, event) => {
    // Adaptar el producto al formato que espera tu carrito
    const cartProduct = {
      id: product.id,
      name: product.nombre,
      price: product.precio,
      category: typeof product.categoria === 'object' ? product.categoria.nombre : product.categoria,
      image: product.imagen
    };
    
    addToCart(cartProduct);
    
    // Feedback visual
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = '¡Añadido!';
    button.style.background = '#4caf50';
    
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '';
    }, 1500);
  };

  // Formatear precio
  const formatPrice = (price) => {
    return `$${price?.toLocaleString('es-CL') || '0'}`;
  };

  return (
    <section id="home" className="page active">
      <div className="container">
        <div className="hero">
          <div className="hero-content">
            <h2>Encuentra las mejores figuras de anime</h2>
            <p>Descubre nuestra exclusiva colección de figuras de tus personajes favoritos. Calidad premium y envío rápido garantizado.</p>
            <a 
              href="#" 
              className="btn view-products-btn" 
              onClick={(e) => { 
                e.preventDefault(); 
                setCurrentPage('products'); 
              }}
            >
              Ver productos
            </a>
          </div>
        </div>

        <h2 className="section-title">Productos Destacados</h2>

        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Cargando productos...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p>❌ {error}</p>
            <button onClick={loadFeaturedProducts} className="btn">
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && featuredProducts.length === 0 && (
          <div className="empty-state">
            <p>No hay productos disponibles en este momento</p>
          </div>
        )}

        <div className="products-grid">
          {featuredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img 
                  src={product.imagen || '/placeholder-image.jpg'} 
                  alt={product.nombre}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300?text=Imagen+No+Disponible';
                  }}
                />
              </div>
              <div className="product-info">
                <h3>{product.nombre}</h3>
                <p className="product-category">
                  {typeof product.categoria === 'object' 
                    ? product.categoria.nombre 
                    : product.categoria || 'Sin categoría'
                  }
                </p>
                <div className="product-stock">
                  {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
                </div>
                <div className="product-price">{formatPrice(product.precio)}</div>
                <button 
                  className={`btn add-to-cart ${product.stock === 0 ? 'disabled' : ''}`}
                  onClick={(e) => handleAddToCart(product, e)}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Agotado' : 'Añadir al carrito'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {!loading && featuredProducts.length > 0 && (
          <div className="view-more-section">
            <button 
              className="btn view-more-btn"
              onClick={() => setCurrentPage('products')}
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;