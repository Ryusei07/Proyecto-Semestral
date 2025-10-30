import { useState, useEffect } from 'react';
import ProductService from "/src/services/ProductService"; // ✅ Con mayúscula
import ProductForm from './ProductForm';
import './ProductsManagement.css';

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [backendStatus, setBackendStatus] = useState('checking');

  // Cargar productos
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      setBackendStatus('checking');
      
      console.log('🔄 Iniciando carga de productos...');
      const productsData = await ProductService.getAllProducts();
      
      console.log('✅ Productos recibidos:', productsData);
      setProducts(productsData);
      setBackendStatus('connected');
      
    } catch (err) {
      console.error('❌ Error:', err);
      setError('No se pudo cargar los productos: ' + err.message);
      setBackendStatus('demo');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Crear producto
  const handleCreateProduct = async (productData) => {
    try {
      await ProductService.createProduct(productData);
      await loadProducts();
      setShowForm(false);
      alert('✅ Producto creado exitosamente!');
    } catch (err) {
      alert('❌ Error al crear producto: ' + err.message);
      throw err;
    }
  };

  // Actualizar producto
  const handleUpdateProduct = async (productData) => {
    try {
      await ProductService.updateProduct(editingProduct.id, productData);
      await loadProducts();
      setEditingProduct(null);
      setShowForm(false);
      alert('✅ Producto actualizado exitosamente!');
    } catch (err) {
      alert('❌ Error al actualizar producto: ' + err.message);
      throw err;
    }
  };

  // Eliminar producto
  const handleDeleteProduct = async (id, productName) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar "${productName}"?`)) {
      try {
        await ProductService.deleteProduct(id);
        await loadProducts();
        alert('✅ Producto eliminado exitosamente!');
      } catch (err) {
        alert('❌ Error al eliminar producto: ' + err.message);
      }
    }
  };

  // Editar producto
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  // Cancelar
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (showForm) {
    return (
      <ProductForm
        product={editingProduct}
        onSave={editingProduct ? handleUpdateProduct : handleCreateProduct}
        onCancel={handleCancelForm}
      />
    );
  }

  return (
    <div className="products-management">
      {/* Header con estado */}
      <div className="page-header">
        <div>
          <h2>Gestión de Productos</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
            <span style={{
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              background: backendStatus === 'connected' ? '#d4edda' : '#fff3cd',
              color: backendStatus === 'connected' ? '#155724' : '#856404',
              border: `1px solid ${backendStatus === 'connected' ? '#c3e6cb' : '#ffeaa7'}`
            }}>
              {backendStatus === 'connected' ? '✅ Conectado' : '⚠️ Demo'}
            </span>
            <span style={{ color: '#666', fontSize: '0.9rem' }}>
              {backendStatus === 'connected' ? 'Base de datos MySQL' : 'Datos de demostración'}
            </span>
          </div>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
          disabled={loading}
        >
          <i className="fas fa-plus"></i>
          Nuevo Producto
        </button>
      </div>

      {/* Mensajes de estado */}
      {backendStatus === 'demo' && (
        <div style={{
          background: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <i className="fas fa-info-circle" style={{ color: '#856404' }}></i>
          <div>
            <strong>Modo de demostración</strong>
            <p style={{ margin: '5px 0 0 0' }}>
              {error ? `Error: ${error}` : 'Mostrando datos de ejemplo. Para conectar con el backend real, inicia el servidor Spring Boot en puerto 8080.'}
            </p>
          </div>
        </div>
      )}

      {loading && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          background: 'white',
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '10px' }}></i>
          <p>{backendStatus === 'checking' ? 'Conectando con el backend...' : 'Cargando productos...'}</p>
        </div>
      )}

      {/* Tabla de productos */}
      {!loading && (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td style={{ fontWeight: 'bold', color: '#666' }}>#{product.id}</td>
                  <td>
                    {product.imagen ? (
                      <img 
                        src={product.imagen} 
                        alt={product.nombre}
                        className="table-img"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="no-image-placeholder" style={{ display: product.imagen ? 'none' : 'flex' }}>
                      <i className="fas fa-image"></i>
                    </div>
                  </td>
                  <td style={{ fontWeight: '600' }}>{product.nombre}</td>
                  <td>
                    <div className="description-truncate" title={product.descripcion}>
                      {product.descripcion}
                    </div>
                  </td>
                  <td style={{ fontWeight: 'bold', color: '#28a745' }}>
                    ${product.precio?.toLocaleString('es-CL')}
                  </td>
                  <td>
                    <span className={product.stock <= 5 ? 'stock-warning' : ''}>
                      {product.stock} unidades
                    </span>
                  </td>
                  <td>
                    <span className="category-badge">
                      {typeof product.categoria === 'object' 
                        ? product.categoria.nombre 
                        : product.categoria || 'Sin categoría'
                      }
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon"
                        onClick={() => handleEditProduct(product)}
                        title="Editar"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="btn-icon btn-danger"
                        onClick={() => handleDeleteProduct(product.id, product.nombre)}
                        title="Eliminar"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && !loading && (
            <div className="empty-state">
              <i className="fas fa-box-open"></i>
              <h3>No hay productos registrados</h3>
              <p>Comienza agregando tu primer producto</p>
              <button 
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
              >
                <i className="fas fa-plus"></i>
                Crear Primer Producto
              </button>
            </div>
          )}
        </div>
      )}

      {/* Contador */}
      {!loading && products.length > 0 && (
        <div className="products-count">
          Mostrando {products.length} producto{products.length !== 1 ? 's' : ''} 
          {backendStatus === 'connected' ? ' desde la base de datos' : ' de demostración'}
        </div>
      )}
    </div>
  );
};

export default ProductsManagement;