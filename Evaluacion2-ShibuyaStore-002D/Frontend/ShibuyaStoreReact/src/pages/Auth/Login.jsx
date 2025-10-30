import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Credenciales específicos para admin
    const adminCredentials = {
      email: 'admin@shibuyastore.cl',
      password: 'admin123'
    };

    // Validar credenciales
    if (formData.email === adminCredentials.email && formData.password === adminCredentials.password) {
      // Redirigir al admin
      navigate('/admin');
    } else if (formData.email && formData.password) {
      // Login normal de usuario
      alert('Inicio de sesión exitoso como usuario');
      setCurrentPage('home');
    } else {
      setError('Por favor completa todos los campos');
    }
  };

  return (
    <section id="login" className="page active">
      <div className="container">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <span className="logo-icon"><i className="fas fa-dragon"></i></span>
              <h2>ShibuyaStore</h2>
              <h3>Iniciar Sesión</h3>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu.email@ejemplo.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Contraseña *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Ingresa tu contraseña"
                />
              </div>

              {error && <div className="error-message" style={{color: '#dc3545', padding: '10px', marginBottom: '15px', textAlign: 'center'}}>{error}</div>}

              <button type="submit" className="btn btn-full">
                Iniciar Sesión
              </button>
              
              <div className="auth-links">
                <p>¿No tienes cuenta? <a href="#" onClick={() => setCurrentPage('register')}>Regístrate aquí</a></p>
                <p><a href="#">¿Olvidaste tu contraseña?</a></p>
                
                {/* CREDENCIALES ELIMINADAS - Ya no son visibles */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;