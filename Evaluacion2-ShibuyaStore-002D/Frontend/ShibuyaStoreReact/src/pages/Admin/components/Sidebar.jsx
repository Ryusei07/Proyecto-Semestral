import './Sidebar.css';

const Sidebar = ({ currentSection, setCurrentSection, isOpen, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'fas fa-home', label: 'Inicio' },
    { id: 'products', icon: 'fas fa-box', label: 'Productos' },
    { id: 'users', icon: 'fas fa-users', label: 'Usuarios' }
  ];

  const handleItemClick = (itemId) => {
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

        {/* Sección Productos - SOLO Listar Productos */}
        <div className="nav-section">Gestión de Productos</div>
        <button 
          className={`nav-item ${currentSection === 'products' ? 'active' : ''}`}
          onClick={() => handleItemClick('products')}
        >
          <i className="fas fa-box"></i>
          <span>Gestionar Productos</span>
        </button>

        {/* Sección Usuarios - SOLO Listar Usuarios */}
        <div className="nav-section">Gestión de Usuarios</div>
        <button 
          className={`nav-item ${currentSection === 'users' ? 'active' : ''}`}
          onClick={() => handleItemClick('users')}
        >
          <i className="fas fa-users"></i>
          <span>Gestionar Usuarios</span>
        </button>

        {/* Sección General */}
        <div className="nav-section">Sistema</div>
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