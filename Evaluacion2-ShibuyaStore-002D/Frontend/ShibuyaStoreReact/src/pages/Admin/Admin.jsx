import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // Esto debe seguir igual
import AdminHeader from './components/Header';
import Dashboard from './Dashboard';
import ProductsManagement from './ProductsManagement';
import UsersManagement from './UsersManagement';
import './Admin.css';

const Admin = () => {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const renderSection = () => {
    switch(currentSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <ProductsManagement />;
      case 'users':
        return <UsersManagement />;
      default:
        return <Dashboard />;
    }
  };

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      navigate('/');
    }
  };

  return (
    <div className="admin-container">
      <Sidebar 
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        isOpen={sidebarOpen}
        onLogout={handleLogout}
      />
      
      <div className="admin-main">
        <AdminHeader 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          currentSection={currentSection}
        />
        
        <div className="admin-content">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default Admin;