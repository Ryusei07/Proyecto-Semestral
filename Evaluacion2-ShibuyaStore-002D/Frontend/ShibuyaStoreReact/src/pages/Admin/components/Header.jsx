import './Header.css';

const AdminHeader = ({ currentSection }) => {
  const getSectionTitle = () => {
    const titles = {
      dashboard: 'Inicio',
      products: 'Gestión de Productos',
      users: 'Gestión de Usuarios'
    };
    return titles[currentSection] || 'Panel de Administración';
  };

  return (
    <header className="admin-header">
      <div className="header-left">
        <h1>{getSectionTitle()}</h1>
      </div>
      <div className="header-right">
        <span className="admin-name">
          <i className="fas fa-user-circle"></i> Administrador
        </span>
      </div>
    </header>
  );
};

export default AdminHeader;