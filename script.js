// Script de ShibuyaStore 
// Navegación entre páginas
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const viewProductsBtn = document.querySelector('.view-products-btn');
    const pages = document.querySelectorAll('.page');
    
    // Función para cambiar de página
    function changePage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });
    }
    
    // Enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            changePage(pageId);
            window.scrollTo(0, 0);
        });
    });
    
    // Botón "Ver productos"
    if (viewProductsBtn) {
        viewProductsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            changePage(pageId);
            window.scrollTo(0, 0);
        });
    }
    
    // Carrito
    const addToCartButtons = document.querySelectorAll('.product-card .btn');
    const cartIcon = document.querySelector('.cart-icon span');
    let cartCount = 0;
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            cartCount++;
            cartIcon.innerHTML = `<i class="fas fa-shopping-cart"></i> Carrito (${cartCount})`;
            
            // Animación
            const originalText = this.textContent;
            this.textContent = '¡Añadido!';
            this.style.background = '#4caf50';
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
            }, 1500);
        });
    });
    
    // Validación del formulario
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (name && email && subject && message) {
            if (isValidEmail(email)) {
                alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
                contactForm.reset();
            } else {
                alert('Por favor, ingresa un correo electrónico válido.');
            }
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
