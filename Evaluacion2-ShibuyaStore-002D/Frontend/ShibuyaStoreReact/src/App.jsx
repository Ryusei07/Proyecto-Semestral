import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import About from './pages/About/About'
import Blog from './pages/Blog/Blog'
import Contact from './pages/Contact/Contact'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Admin from './pages/Admin/Admin'
import Footer from './components/Footer/Footer'
import Cart from './components/Cart/Cart'
import { CartProvider } from './context/CartContext'
import './App.css'

// Componente para la tienda principal
function StoreApp() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Determinar la página actual basada en la URL
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/products') return 'products';
    if (path === '/about') return 'about';
    if (path === '/blog') return 'blog';
    if (path === '/contact') return 'contact';
    if (path === '/login') return 'login';
    if (path === '/register') return 'register';
    return 'home';
  };

  const currentPage = getCurrentPage();

  const setCurrentPage = (page) => {
    navigate(`/${page === 'home' ? '' : page}`);
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'products':
        return <Products />;
      case 'about':
        return <About />;
      case 'blog':
        return <Blog />;
      case 'contact':
        return <Contact />;
      case 'login':
        return <Login setCurrentPage={setCurrentPage} />;
      case 'register':
        return <Register setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        onCartClick={() => setIsCartOpen(true)}
      />
      <main>
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </div>
  );
}

// App principal con Router
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Todas las rutas de la tienda */}
          <Route path="/*" element={<StoreApp />} />
          
          {/* Ruta del admin */}
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;