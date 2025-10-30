import { blogPosts } from '../../data/blogPosts';
import './Blog.css';

const Blog = () => {
  const handleReadMore = (postId) => {
    alert(`Abriendo artículo completo del post ${postId}`);
    // Aquí podrías navegar a una página de detalle del blog
  };

  // Función para manejar errores en imágenes
  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&h=400&fit=crop&auto=format';
    e.target.alt = 'Imagen alternativa sobre anime';
  };

  return (
    <section id="blog">
      <div className="container">
        <h2 className="section-title">Blog & Noticias</h2>
        
        <div className="blog-grid">
          {blogPosts.map(post => (
            <article key={post.id} className="blog-card">
              <div className="blog-image">
                <img 
                  src={post.image} 
                  alt={post.title}
                  onError={handleImageError}
                />
                <div className="blog-overlay">
                  <span className="read-time">5 min read</span>
                </div>
              </div>
              <div className="blog-content">
                <h3>{post.title}</h3>
                <div className="blog-meta">
                  <span><i className="far fa-calendar"></i> {post.date}</span>
                  <span><i className="far fa-user"></i> {post.author}</span>
                  <span><i className="far fa-comments"></i> 12 comentarios</span>
                </div>
                <p>{post.excerpt}</p>
                <div className="blog-tags">
                  <span className="tag">Anime</span>
                  <span className="tag">Noticias</span>
                  <span className="tag">Figuras</span>
                </div>
                <button 
                  className="btn btn-outline"
                  onClick={() => handleReadMore(post.id)}
                >
                  Leer más
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="blog-newsletter">
          <div className="newsletter-content">
            <h3>¡No te pierdas ninguna noticia!</h3>
            <p>Suscríbete a nuestro newsletter y recibe las últimas novedades del mundo anime directamente en tu correo.</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="newsletter-input"
              />
              <button className="btn">Suscribirse</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;