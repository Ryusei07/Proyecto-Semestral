import { useState } from 'react';
import './UsersManagement.css';

const UsersManagement = () => {
  const [users] = useState([
    {
      run: '19011022K',
      name: 'Carlos Miyazaki',
      email: 'carlos.miyazaki@profesor.duocuc.cl',
      type: 'administrador',
      region: 'Región Metropolitana'
    },
    {
      run: '20567890-1',
      name: 'Ana Kobayashi',
      email: 'ana.kobayashi@duocuc.cl',
      type: 'vendedor',
      region: 'Valparaíso'
    },
    {
      run: '18765432-3',
      name: 'Luis Takahashi',
      email: 'luis.takahashi@gmail.com',
      type: 'cliente',
      region: 'Biobío'
    },
    {
      run: '19876543-K',
      name: 'María Sato',
      email: 'maria.sato@gmail.com',
      type: 'cliente',
      region: 'Maule'
    }
  ]);

  const getBadgeClass = (userType) => {
    switch(userType) {
      case 'administrador':
        return 'badge-admin';
      case 'vendedor':
        return 'badge-seller';
      case 'cliente':
        return 'badge-client';
      default:
        return 'badge-client';
    }
  };

  const getBadgeText = (userType) => {
    switch(userType) {
      case 'administrador':
        return 'Administrador';
      case 'vendedor':
        return 'Vendedor';
      case 'cliente':
        return 'Cliente';
      default:
        return 'Cliente';
    }
  };

  const handleEdit = (userRun) => {
    alert(`Editando usuario: ${userRun}`);
  };

  const handleDelete = (userRun) => {
    if (window.confirm(`¿Estás seguro de eliminar al usuario ${userRun}?`)) {
      alert(`Usuario ${userRun} eliminado`);
    }
  };

  return (
    <div className="users-management">
      <div className="page-header">
        <h2>Gestión de Usuarios</h2>
        <button className="btn btn-primary">
          <i className="fas fa-plus"></i> Nuevo Usuario
        </button>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>RUN</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Tipo de Usuario</th>
              <th>Región</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.run}>
                <td>{user.run}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${getBadgeClass(user.type)}`}>
                    {getBadgeText(user.type)}
                  </span>
                </td>
                <td>{user.region}</td>
                <td>
                  <button 
                    className="btn-icon"
                    onClick={() => handleEdit(user.run)}
                    title="Editar"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    className="btn-icon btn-danger"
                    onClick={() => handleDelete(user.run)}
                    title="Eliminar"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;