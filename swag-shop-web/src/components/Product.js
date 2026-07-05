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
        <button type="button" className="btn-primary">Add to Wishlist</button>
      </div>
    </article>
  );
}

export default Product;
