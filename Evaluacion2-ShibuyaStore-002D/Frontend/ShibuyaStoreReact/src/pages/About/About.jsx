import './About.css';

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Carlos Miyazaki',
      role: 'Fundador & CEO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format'
    },
    {
      id: 2,
      name: 'Ana Kobayashi',
      role: 'Directora de Productos',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face&auto=format'
    },
    {
      id: 3,
      name: 'Luis Takahashi',
      role: 'Especialista en Anime',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format'
    }
  ];

  return (
    <section id="about">
      <div className="container">
        <h2 className="section-title">Sobre Nosotros</h2>
        
        <div className="about-content">
          <div className="about-image">
            <img 
              src="https://ramenparados.com/wp-content/uploads/2024/09/la-nobleza-de-las-flores-anime-PV.jpg" 
              alt="Nuestra tienda" 
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&h=400&fit=crop&auto=format';
                e.target.alt = 'Tienda de anime alternativa';
              }}
            />
          </div>
          <div className="about-text">
            <h3>Tu tienda de confianza para figuras de anime</h3>
            <p>ShibuyaStore nació como un pequeño emprendimiento de amantes del anime que querían compartir su pasión con otros fans. Lo que comenzó como un hobby entre amigos se convirtió en la tienda especializada más grande del país.</p>
            <p>Nuestra misión es proporcionar figuras de alta calidad a precios accesibles y envíos rápidos a todo el continente. Cada figura que vendemos pasa por un riguroso proceso de verificación para garantizar su autenticidad.</p>
            <p>Trabajamos directamente con los fabricantes más reconocidos de Japón y Corea del Sur para garantizar la autenticidad y calidad de cada figura que vendemos. Además, contamos con certificaciones oficiales de distribuidores autorizados.</p>
            
            <div className="about-features">
              <div className="feature">
                <i className="fas fa-shield-alt"></i>
                <span>Productos 100% Originales</span>
              </div>
              <div className="feature">
                <i className="fas fa-shipping-fast"></i>
                <span>Envío Rápido</span>
              </div>
              <div className="feature">
                <i className="fas fa-headset"></i>
                <span>Soporte 24/7</span>
              </div>
            </div>
          </div>
        </div>

        <div className="team-section">
          <h3 className="team-title">Nuestro Equipo</h3>
          <div className="team-grid">
            {teamMembers.map(member => (
              <div key={member.id} className="team-member">
                <img 
                  src={member.image} 
                  alt={member.name}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face&auto=format';
                    e.target.alt = 'Avatar por defecto';
                  }}
                />
                <h4>{member.name}</h4>
                <p>{member.role}</p>
                <div className="social-links">
                  <a href="#"><i className="fab fa-linkedin"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;