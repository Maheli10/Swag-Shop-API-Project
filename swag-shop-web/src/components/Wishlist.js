import React from 'react';
import './Wishlist.css';

function Wishlist({ visible, items, onClose, onRemove, onMoveToCart }) {
  if (!visible) return null;
  return (
    <div className="modal">
      <div className="modal-content">
        <header className="modal-header">
          <h2>Wishlist</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </header>
        <ul className="wishlist-list">
          {items.map((item) => (
            <li key={item._id} className="wishlist-item">
              <img src={item.image} alt={item.title} className="wishlist-img" />
              <div className="wishlist-info">
                <span className="wishlist-title">{item.title}</span>
                <span className="wishlist-price">${Number(item.price).toFixed(2)}</span>
              </div>
              <div className="wishlist-actions">
                <button className="btn-move" onClick={() => onMoveToCart(item._id)}>
                  Move to Cart
                </button>
                <button className="btn-remove" onClick={() => onRemove(item._id)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
          {items.length === 0 && <p className="empty-msg">Your wishlist is empty.</p>}
        </ul>
      </div>
    </div>
  );
}

export default Wishlist;
