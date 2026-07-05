import React from 'react';
import './Cart.css';

function Cart({ visible, items, onClose, onRemove }) {
  if (!visible) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <header className="modal-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </header>
        <ul className="cart-list">
          {items.map((item) => (
            <li key={item._id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-img" />
              <div className="cart-info">
                <span className="cart-title">{item.title}</span>
                <span className="cart-price">${Number(item.price).toFixed(2)}</span>
                <span className="cart-qty">Qty: {item.quantity}</span>
              </div>
              <button className="btn-buy" onClick={() => {/* placeholder buy action */}}>
                Buy
              </button>
              <button className="btn-remove" onClick={() => onRemove(item._id)}>
                Remove
              </button>
            </li>
          ))}
          {items.length === 0 && <p className="empty-msg">Your cart is empty.</p>}
        </ul>
      </div>
    </div>
  );
}

export default Cart;
