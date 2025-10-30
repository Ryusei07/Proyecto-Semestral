import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Obtenemos la dirección de tu Backend desde el archivo .env
// Asegúrate de que tu archivo .env tenga: VITE_API_URL=http://localhost:8080
const API_URL = import.meta.env.VITE_API_URL;

const Login = () => { // Quitamos la prop "setCurrentPage", ya que usamos 'navigate'
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para el botón "cargando"
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  // 2. Modificamos el handleSubmit para que sea "async" y llame a la API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validación simple
    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos');
      setIsLoading(false);
      return;
    }

    // 3. ¡AQUÍ ESTÁ LA CONEXIÓN AL BACKEND!
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          contrasena: formData.password // ¡Importante! Debe llamarse 'contrasena' como tu DTO de Spring
        }),
      });

      // 4. Manejamos la respuesta del servidor
      if (response.ok) {
        // ¡Éxito! El backend nos dio un 200 OK
        const adminData = await response.json();
        console.log("Login exitoso:", adminData);
        
        // Opcional: Guardar datos del admin en localStorage (para saber que está logueado)
        localStorage.setItem('adminUser', JSON.stringify(adminData)); 

        navigate('/admin'); // Redirigir al dashboard de admin
      } else {
        // ¡Error! El backend nos dio un 401 (No autorizado) o 403 (Prohibido)
        console.error("Error de login: Credenciales incorrectas o rol no autorizado");
        setError('Credenciales incorrectas o rol no autorizado.');
      }

    } catch (err) {
      // 5. Manejamos errores de red (ej: el backend no está encendido)
      console.error("Error de conexión:", err);
      setError('No se pudo conectar con el servidor. Revisa si el backend está encendido.');
    } finally {
      setIsLoading(false); // Dejar de cargar, sin importar si falló o tuvo éxito
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
                  disabled={isLoading} // Deshabilitar mientras carga
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
                  disabled={isLoading} // Deshabilitar mientras carga
                />
              </div>

              {/* Muestra el error si existe */}
              {error && <div className="error-message" style={{color: '#dc3545', padding: '10px', marginBottom: '15px', textAlign: 'center'}}>{error}</div>}

              {/* 6. Modificamos el botón para que muestre "Iniciando..." */}
              <button type="submit" className="btn btn-full" disabled={isLoading}>
                {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
              </button>
              
              <div className="auth-links">
                {/* 7. Actualizamos esto para que use 'navigate' (si tienes un componente de registro) */}
                <p>¿No tienes cuenta? <a href="#" onClick={() => navigate('/register')}>Regístrate aquí</a></p>
                <p><a href="#">¿Olvidaste tu contraseña?</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
