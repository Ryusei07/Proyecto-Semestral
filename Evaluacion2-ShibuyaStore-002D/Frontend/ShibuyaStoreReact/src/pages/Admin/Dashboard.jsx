import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    {
      id: 1,
      title: 'Productos Totales',
      value: '9',
      icon: 'fas fa-box',
      color: 'var(--primary-color)'
    },
    {
      id: 2,
      title: 'Usuarios Registrados',
      value: '128',
      icon: 'fas fa-users',
      color: 'var(--success-color)'
    },
    {
      id: 3,
      title: 'Órdenes del Mes',
      value: '27',
      icon: 'fas fa-shopping-cart',
      color: 'var(--info-color)'
    },
    {
      id: 4,
      title: 'Ingresos Totales',
      value: '$2,257',
      icon: 'fas fa-dollar-sign',
      color: 'var(--warning-color)'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'new-product',
      message: 'Nuevo producto añadido: "Alisa Mikhailovna Kujou"',
      time: 'Hace 2 horas',
      icon: 'fas fa-plus-circle'
    },
    {
      id: 2,
      type: 'new-user',
      message: 'Nuevo usuario registrado: ana.kobayashi@duocuc.cl',
      time: 'Hace 5 horas',
      icon: 'fas fa-user-plus'
    },
    {
      id: 3,
      type: 'new-order',
      message: 'Nueva orden realizada #ORD-0045',
      time: 'Hace 1 día',
      icon: 'fas fa-shopping-cart'
    }
  ];

  const criticalStock = [
    {
      id: 1,
      name: 'Naruto Uzumaki',
      stock: 3,
      status: 'critical'
    },
    {
      id: 2,
      name: 'Hu Tao',
      stock: 2,
      status: 'critical'
    },
    {
      id: 3,
      name: 'Alisa Mikhailovna Kujou',
      stock: 0,
      status: 'out-of-stock'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-stats">
        {stats.map(stat => (
          <div key={stat.id} className="stat-card">
            <div 
              className="stat-icon"
              style={{ background: stat.color }}
            >
              <i className={stat.icon}></i>
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="dashboard-content">
        <div className="content-block">
          <h2>Actividad Reciente</h2>
          <div className="recent-activity">
            {recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  <i className={activity.icon}></i>
                </div>
                <div className="activity-details">
                  <p>{activity.message}</p>
                  <span>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="content-block">
          <h2>Productos con Stock Crítico</h2>
          <div className="critical-stock">
            {criticalStock.map(product => (
              <div key={product.id} className="stock-item">
                <span className="product-name">{product.name}</span>
                <span className={`stock-amount ${product.status}`}>
                  {product.stock === 0 ? 'Sin stock' : `${product.stock} unidades`}
                </span>
                <button className="btn btn-small">Reabastecer</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
