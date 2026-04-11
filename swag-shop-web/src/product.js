// src/product.js
import React from 'react';
import './product.css';

class Product extends React.Component {
    render() {
        const { title, price, image } = this.props.product;
        return (
            <div className="card mb-4">
                <img className="card-img-top" src={image} alt={title} />
                <div className="card-body">
                    <h4 className="card-title">{title}</h4>
                    <p className="card-text">Price: ${price}</p>
                    <button className="btn btn-primary">Add to Wishlist</button>
                </div>
            </div>
        );
    }
}

export default Product;