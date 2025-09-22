// ===== SISTEMA DE CARRITO DE COMPRAS =====
class Carrito {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('carrito')) || [];
        this.actualizarContador();
    }

    agregarProducto(producto) {
        const productoExistente = this.items.find(item => item.id === producto.id);
        
        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            this.items.push({...producto, cantidad: 1});
        }
        
        this.guardarEnLocalStorage();
        this.actualizarContador();
        return productoExistente ? productoExistente : producto;
    }

    eliminarProducto(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.guardarEnLocalStorage();
        this.actualizarContador();
    }

    actualizarCantidad(id, cantidad) {
        const producto = this.items.find(item => item.id === id);
        if (producto) {
            producto.cantidad = cantidad;
            if (producto.cantidad <= 0) {
                this.eliminarProducto(id);
            } else {
                this.guardarEnLocalStorage();
            }
            this.actualizarContador();
        }
    }

    obtenerTotal() {
        return this.items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    }

    obtenerCantidadTotal() {
        return this.items.reduce((total, item) => total + item.cantidad, 0);
    }

    vaciarCarrito() {
        this.items = [];
        this.guardarEnLocalStorage();
        this.actualizarContador();
    }

    guardarEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(this.items));
    }

    actualizarContador() {
        const contador = this.obtenerCantidadTotal();
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = contador;
        }
    }
}

// ===== INTERFAZ DE USUARIO DEL CARRITO =====
const carritoUI = {
    carrito: new Carrito(),

    init() {
        this.setupEventListeners();
        this.carrito.actualizarContador();
    },

    setupEventListeners() {
        // Evento para los botones "Añadir al carrito"
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart') || 
                e.target.closest('.add-to-cart')) {
                e.preventDefault();
                const button = e.target.classList.contains('add-to-cart') ? 
                    e.target : e.target.closest('.add-to-cart');
                this.agregarProductoAlCarrito(button);
            }
        });

        // Evento para el icono del carrito
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            cartIcon.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleCarrito();
            });
        }
    },

    agregarProductoAlCarrito(button) {
        const productCard = button.closest('.product-card');
        const productId = productCard.dataset.id;
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
        const productImage = productCard.querySelector('img').src;
        
        const producto = {
            id: productId,
            nombre: productName,
            precio: productPrice,
            imagen: productImage
        };
        
        this.carrito.agregarProducto(producto);
        
        // Animación de feedback
        const originalText = button.textContent;
        button.textContent = '¡Añadido!';
        button.style.background = '#4caf50';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 1500);
    },

    toggleCarrito() {
        const carritoFlotante = document.getElementById('carrito-flotante');
        const overlay = document.getElementById('carrito-overlay');
        
        if (carritoFlotante.classList.contains('active')) {
            carritoFlotante.classList.remove('active');
            overlay.classList.remove('active');
        } else {
            carritoFlotante.classList.add('active');
            overlay.classList.add('active');
            this.renderizarCarrito();
        }
    },

    renderizarCarrito() {
        const carritoContainer = document.getElementById('carrito-items');
        const carritoTotal = document.getElementById('carrito-total');
        
        carritoContainer.innerHTML = '';
        
        if (this.carrito.items.length === 0) {
            carritoContainer.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
            carritoTotal.textContent = '$0.00';
            return;
        }
        
        this.carrito.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'carrito-item';
            itemElement.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}">
                <div class="carrito-item-info">
                    <h4>${item.nombre}</h4>
                    <p>$${item.precio.toFixed(2)} x ${item.cantidad}</p>
                </div>
                <div class="carrito-item-controls">
                    <button class="btn-cantidad" onclick="carritoUI.actualizarCantidad('${item.id}', ${item.cantidad - 1})">-</button>
                    <span>${item.cantidad}</span>
                    <button class="btn-cantidad" onclick="carritoUI.actualizarCantidad('${item.id}', ${item.cantidad + 1})">+</button>
                    <button class="btn-eliminar" onclick="carritoUI.eliminarDelCarrito('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            carritoContainer.appendChild(itemElement);
        });
        
        carritoTotal.textContent = `$${this.carrito.obtenerTotal().toFixed(2)}`;
    },

    actualizarCantidad(id, cantidad) {
        this.carrito.actualizarCantidad(id, cantidad);
        this.renderizarCarrito();
    },

    eliminarDelCarrito(id) {
        this.carrito.eliminarProducto(id);
        this.renderizarCarrito();
    },

    vaciarCarrito() {
        this.carrito.vaciarCarrito();
        this.renderizarCarrito();
    },

    realizarCompra() {
        if (this.carrito.items.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        
        alert(`¡Compra realizada por $${this.carrito.obtenerTotal().toFixed(2)}! Gracias por tu compra.`);
        this.carrito.vaciarCarrito();
        this.toggleCarrito();
    }
};

// Inicializar el carrito cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    carritoUI.init();
});