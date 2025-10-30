import { useCart } from '../../context/CartContext';
import './Home.css';

const Home = ({ setCurrentPage }) => {
  const { addToCart } = useCart();

  // Productos destacados en CLP
  const featuredProducts = [
    {
      id: 'PROD-001',
      name: 'Goku',
      price: 39000,
      category: 'Dragon Ball Z',
      image: 'https://phantom.pe/media/catalog/product/cache/c58c05327f55128aefac5642661cf3d1/4/9/4983164880748.jpg'
    },
    {
      id: 'PROD-002',
      name: 'Naruto Uzumaki - Modo sabio',
      price: 54000,
      category: 'Naruto Shippuden',
      image: 'https://manga-imperial.fr/cdn/shop/files/S8f18342d19c743e6a276b7fe91692863B_1600x.webp?v=1707138238'
    },
    {
      id: 'PROD-003',
      name: 'Monkey D. Luffy',
      price: 43000,
      category: 'One Piece',
      image: 'https://i.pinimg.com/736x/c0/e2/37/c0e2378142e0424476f9458f6d02c250.jpg'
    },
    {
      id: 'PROD-004',
      name: 'Eren Jaeger',
      price: 149000,
      category: 'Attack on Titan',
      image: 'https://cdn.shopify.com/s/files/1/0745/0243/9197/files/51FH3-JhwZL._AC_SL1000.jpg?v=1753999379'
    }
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    
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
        <div className="products-grid">
          {featuredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <div className="product-price">${product.price.toLocaleString('es-CL')}</div>
                <button 
                  className="btn add-to-cart"
                  onClick={(e) => handleAddToCart(product, e)}
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;