import { useState, useEffect } from 'react';
import UserService from "/src/services/UserService";
import './UsersManagement.css';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backendStatus, setBackendStatus] = useState('checking');

  // Cargar usuarios desde el servicio
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      setBackendStatus('checking');
      
      console.log('🔄 Cargando usuarios desde el servicio...');
      const usersData = await UserService.getAllUsers();
      
      console.log('✅ Usuarios recibidos:', usersData);
      setUsers(usersData);
      setBackendStatus('connected');
      
    } catch (err) {
      console.error('❌ Error cargando usuarios:', err);
      setError('No se pudo cargar los usuarios: ' + err.message);
      setBackendStatus('demo');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Formatear fecha
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Determinar color del badge según el rol
  const getRoleBadgeColor = (rol) => {
    switch(rol) {
      case 'ADMIN':
        return { background: '#dc3545', color: 'white' };
      case 'USER':
        return { background: '#28a745', color: 'white' };
      case 'MODERATOR':
        return { background: '#ffc107', color: 'black' };
      default:
        return { background: '#6c757d', color: 'white' };
    }
  };

  // Determinar estado del usuario
  const getUserStatus = (user) => {
    if (!user.activo) {
      return { text: 'Inactivo', color: '#6c757d' };
    }
    
    const lastAccess = new Date(user.ultimoAcceso);
    const today = new Date();
    const diffDays = Math.floor((today - lastAccess) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) {
      return { text: 'En línea', color: '#28a745' };
    } else if (diffDays <= 7) {
      return { text: 'Reciente', color: '#ffc107' };
    } else {
      return { text: 'Inactivo', color: '#6c757d' };
    }
  };

  if (loading) {
    return (
      <div className="users-management">
        <div className="page-header">
          <div>
            <h2>Gestión de Usuarios</h2>
            <div className="page-header-info">
              <span className="status-badge checking">Cargando...</span>
            </div>
          </div>
        </div>

        <div className="loading">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Cargando usuarios...</p>
          <small>Conectando con la base de datos</small>
        </div>
      </div>
    );
  }

  return (
    <div className="users-management">
      {/* Header con estado */}
      <div className="page-header">
        <div>
          <h2>Gestión de Usuarios</h2>
          <div className="page-header-info">
            <span className={`status-badge ${backendStatus === 'connected' ? 'connected' : 'demo'}`}>
              {backendStatus === 'connected' ? '✅ Conectado' : '⚠️ Demo'}
            </span>
            <span className="status-text">
              {backendStatus === 'connected' ? 'Base de datos MySQL' : 'Datos de demostración'}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary">
            <i className="fas fa-download"></i>
            Exportar
          </button>
          <button className="btn btn-primary">
            <i className="fas fa-sync"></i>
            Actualizar
          </button>
        </div>
      </div>

      {/* Mensajes de estado */}
      {backendStatus === 'demo' && (
        <div className="alert alert-demo">
          <i className="fas fa-info-circle"></i>
          <div>
            <strong>Modo de demostración</strong>
            <p style={{ margin: '5px 0 0 0' }}>
              {error ? `Error: ${error}` : 'Mostrando datos de ejemplo. Para conectar con el backend real, asegúrate de que el endpoint /api/usuarios exista.'}
            </p>
          </div>
        </div>
      )}

      {/* Tabla de usuarios */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Fecha Registro</th>
              <th>Último Acceso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              const userStatus = getUserStatus(user);
              const roleBadge = getRoleBadgeColor(user.rol);
              
              return (
                <tr key={user.id}>
                  <td style={{ fontWeight: 'bold', color: '#666' }}>#{user.id}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1rem'
                      }}>
                        {user.nombre.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', color: '#2d3436' }}>
                          {user.nombre}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ color: '#495057', fontSize: '0.9rem' }}>
                      {user.email}
                    </div>
                  </td>
                  <td>
                    <span className="role-badge" style={{
                      background: roleBadge.background,
                      color: roleBadge.color
                    }}>
                      {user.rol}
                    </span>
                  </td>
                  <td>
                    <span className="status-badge" style={{
                      color: userStatus.color,
                      border: `1px solid ${userStatus.color}`
                    }}>
                      <i className={`fas fa-circle`} style={{ 
                        color: userStatus.color,
                        fontSize: '0.6rem',
                        marginRight: '6px'
                      }}></i>
                      {userStatus.text}
                    </span>
                  </td>
                  <td>
                    <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                      {formatDate(user.fechaRegistro)}
                    </span>
                  </td>
                  <td>
                    <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                      {formatDate(user.ultimoAcceso)}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="Editar usuario">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn-icon btn-danger" title="Eliminar usuario">
                        <i className="fas fa-trash"></i>
                      </button>
                      <button className="btn-icon btn-info" title="Ver detalles">
                        <i className="fas fa-eye"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {users.length === 0 && !loading && (
          <div className="empty-state">
            <i className="fas fa-users"></i>
            <h3>No hay usuarios registrados</h3>
            <p>No se encontraron usuarios en el sistema</p>
          </div>
        )}
      </div>

      {/* Contador */}
      {!loading && users.length > 0 && (
        <div className="users-count">
          Mostrando {users.length} usuario{users.length !== 1 ? 's' : ''} 
          {backendStatus === 'connected' ? ' desde la base de datos' : ' de demostración'}
        </div>
      )}
    </div>
  );
};

export default UsersManagement;