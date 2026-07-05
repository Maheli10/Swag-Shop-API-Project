import React from 'react';

function Product({ product, addToWishlist, addToCart }) {
  const { title, price, image } = product;

  return (
    <article className="card">
      <div className="card__image-wrap">
        <img src={image} alt={title} />
        <span className="card__badge">New</span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-price">${Number(price).toFixed(2)}</p>
          <div className="card-actions" style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <button type="button" className="btn-primary" aria-label="Add to Wishlist" onClick={() => addToWishlist(product)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <button type="button" className="btn-primary" aria-label="Add to Cart" onClick={() => addToCart(product)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6h15l-1.5 9h-12z" /><circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></svg>
            </button>
            <button type="button" className="btn-primary" aria-label="Buy now" onClick={() => addToCart(product)}>
              Buy
            </button>
          </div>
      </div>
    </article>
  );
}

export default Product;
