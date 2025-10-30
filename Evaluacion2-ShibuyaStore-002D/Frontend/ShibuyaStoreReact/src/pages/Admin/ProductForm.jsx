import { useState, useEffect } from 'react';
import ProductService from "/src/services/ProductService";
import './ProductForm.css';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: { id: null, nombre: '' },
    imagen: ''
  });

  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  // Categorías disponibles
  const categoriasDisponibles = [
    { id: 1, nombre: 'Dragon Ball Z' },
    { id: 2, nombre: 'Naruto Shippuden' },
    { id: 3, nombre: 'One Piece' },
    { id: 4, nombre: 'Attack on Titan' },
    { id: 5, nombre: 'Demon Slayer' },
    { id: 6, nombre: 'My Hero Academia' },
    { id: 7, nombre: 'Genshin Impact' },
    { id: 8, nombre: 'Jujutsu Kaisen' },
    { id: 9, nombre: 'Romance' },
    { id: 10, nombre: 'Otros' }
  ];

  useEffect(() => {
    if (product) {
      // Si estamos editando, cargar los datos del producto
      let categoriaProducto = product.categoria;
      
      if (typeof product.categoria === 'string') {
        const categoriaEncontrada = categoriasDisponibles.find(
          cat => cat.nombre === product.categoria
        );
        categoriaProducto = categoriaEncontrada || { id: null, nombre: product.categoria };
      }

      setFormData({
        nombre: product.nombre || '',
        descripcion: product.descripcion || '',
        precio: product.precio || '',
        stock: product.stock || '',
        categoria: categoriaProducto,
        imagen: product.imagen || ''
      });
      setImagePreview(product.imagen || '');
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'categoria') {
      const categoriaSeleccionada = categoriasDisponibles.find(cat => cat.id === parseInt(value));
      setFormData(prev => ({
        ...prev,
        categoria: categoriaSeleccionada || { id: null, nombre: value }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));

      if (name === 'imagen') {
        setImagePreview(value);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    console.log('🔄 ========== INICIANDO ENVÍO DE FORMULARIO ==========');
    
    // Validaciones básicas
    if (!formData.nombre.trim()) {
      alert('El nombre del producto es requerido');
      setLoading(false);
      return;
    }

    if (!formData.descripcion.trim()) {
      alert('La descripción del producto es requerida');
      setLoading(false);
      return;
    }

    if (!formData.precio || parseFloat(formData.precio) <= 0) {
      alert('El precio debe ser mayor a 0');
      setLoading(false);
      return;
    }

    if (!formData.stock || parseInt(formData.stock) < 0) {
      alert('El stock no puede ser negativo');
      setLoading(false);
      return;
    }

    if (!formData.categoria.nombre.trim()) {
      alert('La categoría es requerida');
      setLoading(false);
      return;
    }

    try {
      // Preparar datos para enviar al backend
      const productData = {
        nombre: formData.nombre.trim(),
        descripcion: formData.descripcion.trim(),
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock),
        categoria: formData.categoria,
        imagen: formData.imagen.trim(),
        activo: true
      };

      console.log('📋 DATOS DEL FORMULARIO COMPLETOS:');
      console.log('📍 formData (estado del formulario):', formData);
      console.log('📤 productData (datos a enviar):', productData);
      console.log('🔍 Estructura de categoría:', {
        tipo: typeof productData.categoria,
        valor: productData.categoria,
        tieneId: !!productData.categoria.id,
        tieneNombre: !!productData.categoria.nombre
      });
      console.log('📦 JSON stringificado:', JSON.stringify(productData, null, 2));

      console.log('🚀 Llamando a onSave...');
      await onSave(productData);
      
      console.log('✅ Formulario procesado exitosamente');
      
    } catch (error) {
      console.error('❌ ERROR EN EL FORMULARIO:', error);
      console.log('🔍 Tipo de error:', typeof error);
      console.log('🔍 Mensaje de error:', error.message);
      console.log('🔍 Stack de error:', error.stack);
      
      // No necesitamos alert aquí porque onSave ya maneja el error
    } finally {
      setLoading(false);
      console.log('🏁 ========== FINALIZÓ ENVÍO DE FORMULARIO ==========');
    }
  };

  return (
    <div className="product-form-container">
      <div className="form-header">
        <h2>{product ? 'Editar Producto' : 'Nuevo Producto'}</h2>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          <i className="fas fa-arrow-left"></i> Volver a la lista
        </button>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre del Producto *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Goku Super Saiyan"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción *</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción detallada del producto..."
            rows="4"
            required
            disabled={loading}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="precio">Precio (CLP) *</label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              placeholder="Ej: 39000"
              min="0"
              step="1000"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock *</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Ej: 15"
              min="0"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoria">Categoría *</label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria.id || ''}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">Selecciona una categoría</option>
              {categoriasDisponibles.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
            {formData.categoria.id && (
              <small className="form-help">
                Categoría seleccionada: {formData.categoria.nombre} (ID: {formData.categoria.id})
              </small>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="imagen">URL de la Imagen</label>
          <input
            type="url"
            id="imagen"
            name="imagen"
            value={formData.imagen}
            onChange={handleChange}
            placeholder="https://ejemplo.com/imagen.jpg"
            disabled={loading}
          />
          <small className="form-help">Opcional - puedes agregarla después</small>
        </div>

        {imagePreview && (
          <div className="image-preview">
            <p>Vista previa:</p>
            <img 
              src={imagePreview} 
              alt="Vista previa" 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }} 
            />
            <div className="image-error" style={{display: 'none'}}>
              <i className="fas fa-exclamation-triangle"></i>
              <span>No se puede cargar la imagen</span>
            </div>
          </div>
        )}

        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                {product ? 'Actualizando...' : 'Creando...'}
              </>
            ) : (
              <>
                <i className="fas fa-save"></i>
                {product ? 'Actualizar Producto' : 'Crear Producto'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;