import { useState, useEffect } from 'react';
import ProductService from "/src/services/ProductService";
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    lowStockProducts: 0,
    outOfStockProducts: 0,
    totalStockValue: 0,
    productsByCategory: {},
    criticalProducts: []
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backendStatus, setBackendStatus] = useState('checking');
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      setBackendStatus('checking');
      
      console.log('🔄 Cargando datos del dashboard...');
      
      // Cargar estadísticas y actividad en paralelo
      const [dashboardStats, activity] = await Promise.all([
        ProductService.getDashboardStats(),
        ProductService.getRecentActivity()
      ]);
      
      console.log('✅ Datos del dashboard recibidos:', dashboardStats);
      
      setStats(dashboardStats);
      setRecentActivity(activity);
      setBackendStatus('connected');

    } catch (err) {
      console.error('❌ Error cargando dashboard:', err);
      setError(err.message);
      setBackendStatus('demo');
      
      // Cargar datos de demostración en caso de error
      const demoStats = ProductService.getDemoStats();
      const demoActivity = ProductService.getDemoActivity();
      setStats(demoStats);
      setRecentActivity(demoActivity);
    } finally {
      setLoading(false);
    }
  };

  // Formatear precio en CLP
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  // Estadísticas para las cards
  const dashboardStats = [
    {
      id: 1,
      title: 'Productos Totales',
      value: stats.totalProducts.toString(),
      icon: 'fas fa-boxes',
      color: 'var(--primary-color)',
      description: `${stats.activeProducts} activos`
    },
    {
      id: 2,
      title: 'Valor Total Stock',
      value: formatPrice(stats.totalStockValue),
      icon: 'fas fa-dollar-sign',
      color: 'var(--success-color)',
      description: 'En inventario'
    },
    {
      id: 3,
      title: 'Stock Bajo',
      value: stats.lowStockProducts.toString(),
      icon: 'fas fa-exclamation-triangle',
      color: 'var(--warning-color)',
      description: '≤ 5 unidades'
    },
    {
      id: 4,
      title: 'Sin Stock',
      value: stats.outOfStockProducts.toString(),
      icon: 'fas fa-times-circle',
      color: 'var(--danger-color)',
      description: 'Necesitan reposición'
    },
    {
      id: 5,
      title: 'Categorías',
      value: Object.keys(stats.productsByCategory).length.toString(),
      icon: 'fas fa-tags',
      color: 'var(--info-color)',
      description: 'Diferentes categorías'
    },
    {
      id: 6,
      title: 'Estado',
      value: backendStatus === 'connected' ? 'Conectado' : 'Demo',
      icon: backendStatus === 'connected' ? 'fas fa-database' : 'fas fa-code',
      color: backendStatus === 'connected' ? '#28a745' : '#6c757d',
      description: backendStatus === 'connected' ? 'Base de datos' : 'Modo demostración'
    }
  ];

  // Top categorías
  const topCategories = Object.entries(stats.productsByCategory)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([category, count]) => ({
      category,
      count,
      percentage: ((count / stats.totalProducts) * 100).toFixed(1)
    }));

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-loading">
          <i className="fas fa-spinner fa-spin"></i>
          <h3>Cargando Dashboard...</h3>
          <p>Obteniendo datos actualizados del sistema</p>
          <small style={{color: '#666'}}>
            {backendStatus === 'checking' ? 'Conectando con la base de datos...' : 'Procesando información...'}
          </small>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Banner de estado */}
      {backendStatus !== 'connected' && (
        <div className="dashboard-alert demo">
          <i className="fas fa-info-circle"></i>
          <div style={{flex: 1}}>
            <strong>Modo de demostración</strong>
            <p style={{margin: '5px 0 0 0'}}>
              {error ? `Error: ${error}` : 'Mostrando datos de ejemplo. Inicia el backend Spring Boot para ver datos reales.'}
            </p>
          </div>
          <button 
            onClick={loadDashboardData}
            className="btn btn-primary"
            style={{
              background: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            <i className="fas fa-redo"></i> Reintentar
          </button>
        </div>
      )}

      {backendStatus === 'connected' && (
        <div className="dashboard-alert connected">
          <i className="fas fa-check-circle"></i>
          <div>
            <strong>✅ Conectado a la base de datos</strong>
            <p style={{margin: '5px 0 0 0'}}>
              Mostrando datos reales en tiempo real - Actualizado: {new Date(stats.lastUpdated).toLocaleTimeString()}
            </p>
          </div>
        </div>
      )}

      {/* Estadísticas principales */}
      <div className="dashboard-stats">
        {dashboardStats.map(stat => (
          <div key={stat.id} className="stat-card">
            <div className="stat-icon" style={{ background: stat.color }}>
              <i className={stat.icon}></i>
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
              <small>{stat.description}</small>
            </div>
          </div>
        ))}
      </div>
      
      {/* Contenido principal */}
      <div className="dashboard-content">
        {/* Columna izquierda - Actividad y Categorías */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Actividad Reciente */}
          <div className="content-block">
            <h2>
              <i className="fas fa-history"></i>
              Actividad Reciente
            </h2>
            <div className="recent-activity">
              {recentActivity.map(activity => (
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

          {/* Top Categorías */}
          <div className="content-block">
            <h2>
              <i className="fas fa-chart-pie"></i>
              Top Categorías
            </h2>
            <div className="critical-stock">
              {topCategories.map((item, index) => (
                <div key={item.category} className="stock-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                    <span style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      background: [
                        'var(--primary-color)',
                        'var(--secondary-color)',
                        'var(--success-color)',
                        'var(--warning-color)',
                        'var(--info-color)'
                      ][index % 5],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '0.7rem',
                      fontWeight: 'bold'
                    }}>
                      {index + 1}
                    </span>
                    <span className="product-name">{item.category}</span>
                  </div>
                  <span style={{ 
                    fontWeight: '600', 
                    color: 'var(--dark-color)',
                    margin: '0 15px'
                  }}>
                    {item.count} productos
                  </span>
                  <span style={{
                    background: '#e9ecef',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    color: '#6c757d'
                  }}>
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Columna derecha - Stock Crítico */}
        <div className="content-block">
          <h2>
            <i className="fas fa-exclamation-circle"></i>
            Productos Críticos
          </h2>
          <div className="critical-stock">
            {stats.criticalProducts.map(product => (
              <div key={product.id} className="stock-item">
                <div style={{ flex: 1 }}>
                  <div className="product-name">{product.nombre}</div>
                  <small style={{ color: '#6c757d', fontSize: '0.8rem' }}>
                    {product.categoria}
                  </small>
                </div>
                <span className={`stock-amount ${product.status}`}>
                  {product.stock === 0 ? 'SIN STOCK' : `${product.stock} unidades`}
                </span>
                <button className="btn btn-small">
                  <i className="fas fa-plus"></i>
                  Reabastecer
                </button>
              </div>
            ))}
            {stats.criticalProducts.length === 0 && (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px 20px', 
                color: '#28a745' 
              }}>
                <i className="fas fa-check-circle" style={{ 
                  fontSize: '3rem', 
                  marginBottom: '15px' 
                }}></i>
                <h4 style={{ margin: '0 0 10px 0' }}>¡Excelente!</h4>
                <p style={{ margin: 0 }}>No hay productos con stock crítico</p>
                <small>Todos los productos tienen stock suficiente</small>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resumen inferior */}
      <div style={{
        background: 'white',
        borderRadius: '15px',
        padding: '25px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        border: '1px solid #f1f3f4',
        marginTop: '20px'
      }}>
        <h3 style={{ 
          marginBottom: '15px',
          color: 'var(--dark-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <i className="fas fa-chart-bar"></i>
          Resumen del Inventario
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
              {stats.totalProducts}
            </div>
            <div style={{ color: '#6c757d', fontSize: '0.9rem' }}>Total Productos</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success-color)' }}>
              {stats.activeProducts}
            </div>
            <div style={{ color: '#6c757d', fontSize: '0.9rem' }}>Productos Activos</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--warning-color)' }}>
              {stats.lowStockProducts}
            </div>
            <div style={{ color: '#6c757d', fontSize: '0.9rem' }}>Stock Bajo</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--danger-color)' }}>
              {stats.outOfStockProducts}
            </div>
            <div style={{ color: '#6c757d', fontSize: '0.9rem' }}>Sin Stock</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;