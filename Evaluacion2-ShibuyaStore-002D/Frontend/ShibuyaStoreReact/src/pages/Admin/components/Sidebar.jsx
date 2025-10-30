import './Sidebar.css';

const Sidebar = ({ currentSection, setCurrentSection, isOpen, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'fas fa-home', label: 'Inicio' },
    { id: 'products', icon: 'fas fa-box', label: 'Listar Productos' },
    { id: 'new-product', icon: 'fas fa-plus-circle', label: 'Nuevo Producto' },
    { id: 'users', icon: 'fas fa-users', label: 'Listar Usuarios' },
    { id: 'new-user', icon: 'fas fa-user-plus', label: 'Nuevo Usuario' }
  ];

  const handleItemClick = (itemId) => {
    if (itemId === 'new-product' || itemId === 'new-user') {
      alert(`Funcionalidad: ${itemId}`);
      return;
    }
    setCurrentSection(itemId);
  };

  return (
    <div className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <span className="logo-icon"><i className="fas fa-dragon"></i></span>
        <h2>ShibuyaStore</h2>
        <p>Panel de Administración</p>
      </div>
      
      <nav className="sidebar-nav">
        {/* Item Inicio */}
        <button 
          className={`nav-item ${currentSection === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleItemClick('dashboard')}
        >
          <i className="fas fa-home"></i>
          <span>Inicio</span>
        </button>

        {/* Sección Productos */}
        <div className="nav-section">Productos</div>
        <button 
          className={`nav-item ${currentSection === 'products' ? 'active' : ''}`}
          onClick={() => handleItemClick('products')}
        >
          <i className="fas fa-box"></i>
          <span>Listar Productos</span>
        </button>
        <button 
          className="nav-item"
          onClick={() => handleItemClick('new-product')}
        >
          <i className="fas fa-plus-circle"></i>
          <span>Nuevo Producto</span>
        </button>

        {/* Sección Usuarios */}
        <div className="nav-section">Usuarios</div>
        <button 
          className={`nav-item ${currentSection === 'users' ? 'active' : ''}`}
          onClick={() => handleItemClick('users')}
        >
          <i className="fas fa-users"></i>
          <span>Listar Usuarios</span>
        </button>
        <button 
          className="nav-item"
          onClick={() => handleItemClick('new-user')}
        >
          <i className="fas fa-user-plus"></i>
          <span>Nuevo Usuario</span>
        </button>

        {/* Sección General */}
        <div className="nav-section">General</div>
        <button 
          className="nav-item logout-item"
          onClick={onLogout}
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>Cerrar Sesión</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;