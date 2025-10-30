import { useState } from 'react';
import './Auth.css';

const Register = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    run: '',
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    address: '',
    terms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpiar error cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Validación especial para confirmación de contraseña
    if (name === 'password' || name === 'confirmPassword') {
      validatePasswordMatch();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar RUN
    if (!formData.run) {
      newErrors.run = 'El RUN es obligatorio';
    } else if (!validateRun(formData.run)) {
      newErrors.run = 'RUN inválido. Formato: 12345678K (sin puntos ni guión)';
    }

    // Validar nombre
    if (!formData.name) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (!isValidName(formData.name)) {
      newErrors.name = 'El nombre solo puede contener letras y espacios';
    }

    // Validar apellidos
    if (!formData.lastname) {
      newErrors.lastname = 'Los apellidos son obligatorios';
    } else if (!isValidName(formData.lastname)) {
      newErrors.lastname = 'Los apellidos solo pueden contener letras y espacios';
    }

    // Validar email
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Por favor, ingresa un correo electrónico válido';
    } else if (!validateEmailDomain(formData.email)) {
      newErrors.email = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com';
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 4 || formData.password.length > 10) {
      newErrors.password = 'La contraseña debe tener entre 4 y 10 caracteres';
    }

    // Validar confirmación de contraseña
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Validar dirección
    if (!formData.address) {
      newErrors.address = 'La dirección es obligatoria';
    }

    // Validar términos
    if (!formData.terms) {
      newErrors.terms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordMatch = () => {
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Las contraseñas no coinciden'
      }));
      return false;
    } else {
      setErrors(prev => ({
        ...prev,
        confirmPassword: ''
      }));
      return true;
    }
  };

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateEmailDomain = (email) => {
    const validDomains = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    return validDomains.some(domain => email.includes(domain));
  };

  const isValidName = (name) => {
    const re = /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]{2,50}$/;
    return re.test(name);
  };

  const validateRun = (run) => {
    const runRegex = /^[0-9]{7,9}[0-9Kk]$/;
    return runRegex.test(run);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('¡Cuenta creada exitosamente!');
      setFormData({
        run: '',
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthdate: '',
        address: '',
        terms: false
      });
      setCurrentPage('login');
      
    } catch (error) {
      alert('Error al crear la cuenta. Por favor, intenta nuevamente.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="register">
      <div className="container">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <span className="logo-icon"><i className="fas fa-dragon"></i></span>
              <h2>ShibuyaStore</h2>
              <h3>Crear Cuenta</h3>
            </div>
            
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="register-run">RUN *</label>
                <input 
                  type="text" 
                  id="register-run" 
                  name="run" 
                  value={formData.run}
                  onChange={handleChange}
                  required
                  placeholder="19011022K (sin puntos ni guión)"
                  className={errors.run ? 'invalid' : ''}
                />
                {errors.run && <span className="error-message">{errors.run}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="register-name">Nombre *</label>
                <input 
                  type="text" 
                  id="register-name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Ingresa tu nombre"
                  className={errors.name ? 'invalid' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="register-lastname">Apellidos *</label>
                <input 
                  type="text" 
                  id="register-lastname" 
                  name="lastname" 
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                  placeholder="Ingresa tus apellidos"
                  className={errors.lastname ? 'invalid' : ''}
                />
                {errors.lastname && <span className="error-message">{errors.lastname}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="register-email">Correo Electrónico *</label>
                <input 
                  type="email" 
                  id="register-email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu.email@ejemplo.com"
                  className={errors.email ? 'invalid' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="register-password">Contraseña *</label>
                <input 
                  type="password" 
                  id="register-password" 
                  name="password" 
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Crea una contraseña (4-10 caracteres)"
                  className={errors.password ? 'invalid' : ''}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="register-confirm-password">Confirmar Contraseña *</label>
                <input 
                  type="password" 
                  id="register-confirm-password" 
                  name="confirmPassword" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Repite tu contraseña"
                  className={errors.confirmPassword ? 'invalid' : ''}
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="register-birthdate">Fecha de Nacimiento (opcional)</label>
                <input 
                  type="date" 
                  id="register-birthdate" 
                  name="birthdate" 
                  value={formData.birthdate}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="register-address">Dirección *</label>
                <input 
                  type="text" 
                  id="register-address" 
                  name="address" 
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Ingresa tu dirección completa"
                  className={errors.address ? 'invalid' : ''}
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>
              
              <div className="form-group">
                <div className="checkbox-group">
                  <input 
                    type="checkbox" 
                    id="register-terms" 
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    className={errors.terms ? 'invalid' : ''}
                  />
                  <label htmlFor="register-terms">Acepto los términos y condiciones</label>
                </div>
                {errors.terms && <span className="error-message">{errors.terms}</span>}
              </div>
              
              <button 
                type="submit" 
                className={`btn btn-full ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </button>
              
              <div className="auth-links">
                <p>¿Ya tienes cuenta? 
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage('login');
                    }}
                  >
                    Inicia sesión aquí
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;