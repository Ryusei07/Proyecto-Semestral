import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    newsletter: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre completo es obligatorio';
    } else if (!isValidName(formData.name)) {
      newErrors.name = 'El nombre solo puede contener letras y espacios';
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Por favor, ingresa un correo electrónico válido';
    }

    // Validar asunto
    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es obligatorio';
    } else if (formData.subject.length < 5) {
      newErrors.subject = 'El asunto debe tener al menos 5 caracteres';
    }

    // Validar mensaje
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es obligatorio';
    } else if (formData.message.length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const isValidName = (name) => {
    const re = /^[A-Za-záéíóúñÁÉÍÓÚÑ\s]{2,50}$/;
    return re.test(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular envío del formulario
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        newsletter: false
      });
      
    } catch (error) {
      alert('Error al enviar el mensaje. Por favor, intenta nuevamente.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="page">
      <div className="container">
        <h2 className="section-title">Contáctanos</h2>
        
        <div className="contact-container">
          <div className="contact-info">
            <h3>Información de Contacto</h3>
            
            <div className="contact-details">
              <p><i className="fas fa-map-marker-alt"></i> Sin tienda fisica aun!!!</p>
              <p><i className="fas fa-envelope"></i> info@animeshibuyastore.cl</p>
              <p><i className="fas fa-phone"></i> +56 9 1234 5678</p>
              <p><i className="fas fa-clock"></i> Soporte de Lunes a Sábado: 10:00 - 20:00</p>
            </div>

            <div className="contact-features">
              <div className="feature-item">
                <i className="fas fa-shipping-fast"></i>
                <div>
                  <h4>Envío Gratis</h4>
                  <p>En compras sobre $50.000</p>
                </div>
              </div>
              <div className="feature-item">
                <i className="fas fa-undo"></i>
                <div>
                  <h4>30 Días Devolución</h4>
                  <p>Garantía de satisfacción</p>
                </div>
              </div>
              <div className="feature-item">
                <i className="fas fa-shield-alt"></i>
                <div>
                  <h4>Pago Seguro</h4>
                  <p>Transacciones protegidas</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <h3>Envíanos un Mensaje</h3>
            
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="name">Nombre completo *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  placeholder="Ingresa tu nombre completo"
                  className={errors.name ? 'invalid' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
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
                  className={errors.email ? 'invalid' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Teléfono (opcional)</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+56 9 1234 5678"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Asunto *</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Ej: Consulta sobre productos"
                  className={errors.subject ? 'invalid' : ''}
                />
                {errors.subject && <span className="error-message">{errors.subject}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Mensaje *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Escribe tu mensaje aquí..."
                  rows="5"
                  className={errors.message ? 'invalid' : ''}
                ></textarea>
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>
              
              <div className="form-group">
                <div className="checkbox-group">
                  <input 
                    type="checkbox" 
                    id="newsletter" 
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                  />
                  <label htmlFor="newsletter">Deseo recibir novedades y ofertas por email</label>
                </div>
              </div>
              
              <button 
                type="submit" 
                className={`btn ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;