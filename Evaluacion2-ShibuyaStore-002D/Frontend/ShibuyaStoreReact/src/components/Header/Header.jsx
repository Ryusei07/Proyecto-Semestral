import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = ({ currentPage, setCurrentPage, onCartClick }) => {
  const { getTotalItems } = useCart();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Productos' },
    { id: 'about', label: 'Nosotros' },
    { id: 'blog', label: 'Blogs' },
    { id: 'contact', label: 'Contacto' },
    { id: 'login', label: 'Login' }
  ];

  const handleNavClick = (pageId, e) => {
    e.preventDefault();
    setCurrentPage(pageId);
  };

  return (
    <header>
      <div className="container header-content">
        <div className="logo">
          <span className="logo-icon"><i className="fas fa-dragon"></i></span>
          <h1>ShibuyaStore</h1>
        </div>
        
        <nav>
          <ul>
            {navItems.map(item => (
              <li key={item.id}>
                <a 
                  href="#"
                  className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(item.id, e)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="cart-icon" onClick={onCartClick}>
          <span>
            <i className="fas fa-shopping-cart"></i> Carrito ({getTotalItems()})
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;