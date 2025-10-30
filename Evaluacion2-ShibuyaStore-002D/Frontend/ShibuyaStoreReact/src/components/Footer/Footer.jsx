import './Footer.css';

const Footer = ({ setCurrentPage }) => {
  const footerSections = [
    {
      title: 'ShibuyaStore',
      content: <p>Tu tienda confiable para figuras de anime de alta calidad.</p>
    },
    {
      title: 'Enlaces rápidos',
      links: [
        { id: 'home', label: 'Home' },
        { id: 'products', label: 'Productos' },
        { id: 'about', label: 'Nosotros' },
        { id: 'blog', label: 'Blog' },
        { id: 'contact', label: 'Contacto' }
      ]
    },
    {
      title: 'Categorías',
      links: [
        { id: 'dragon-ball', label: 'Dragon Ball' },
        { id: 'naruto', label: 'Naruto' },
        { id: 'one-piece', label: 'One Piece' },
        { id: 'attack-on-titan', label: 'Attack on Titan' },
        { id: 'my-hero-academia', label: 'My Hero Academia' }
      ]
    },
    {
      title: 'Síguenos',
      social: true
    }
  ];

  const handleLinkClick = (pageId) => {
    setCurrentPage(pageId);
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          {footerSections.map((section, index) => (
            <div key={index} className="footer-section">
              <h3>{section.title}</h3>
              
              {section.content && section.content}
              
              {section.links && (
                <ul>
                  {section.links.map(link => (
                    <li key={link.id}>
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(link.id);
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              
              {section.social && (
                <div className="social-icons">
                  <a href="#"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-youtube"></i></a>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 ShibuyaStore. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;