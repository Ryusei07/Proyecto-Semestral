import { useCart } from '../../context/CartContext';
import './Cart.css';

const Cart = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice, formatCLP } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }
    
    alert(`¡Compra realizada por ${formatCLP(getTotalPrice())}! Gracias por tu compra.`);
    clearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="carrito-overlay active" onClick={onClose}></div>
      <div className="carrito-flotante active">
        <div className="carrito-header">
          <h3>Tu Carrito</h3>
          <button className="cerrar-carrito" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="carrito-items">
          {items.length === 0 ? (
            <p className="carrito-vacio">Tu carrito está vacío</p>
          ) : (
            items.map(item => (
              <div key={item.id} className="carrito-item">
                <img src={item.image} alt={item.name} />
                <div className="carrito-item-info">
                  <h4>{item.name}</h4>
                  <p>{formatCLP(item.price)} x {item.cantidad}</p>
                </div>
                <div className="carrito-item-controls">
                  <button 
                    className="btn-cantidad"
                    onClick={() => handleQuantityChange(item.id, item.cantidad - 1)}
                  >
                    -
                  </button>
                  <span>{item.cantidad}</span>
                  <button 
                    className="btn-cantidad"
                    onClick={() => handleQuantityChange(item.id, item.cantidad + 1)}
                  >
                    +
                  </button>
                  <button 
                    className="btn-eliminar"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="carrito-footer">
          <div className="carrito-total">
            <span>Total:</span>
            <span>{formatCLP(getTotalPrice())}</span>
          </div>
          <div className="carrito-acciones">
            <button className="btn btn-vaciar" onClick={clearCart}>
              Vaciar Carrito
            </button>
            <button className="btn btn-comprar" onClick={handleCheckout}>
              Realizar Compra
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;