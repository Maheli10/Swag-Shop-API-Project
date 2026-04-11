// src/App.js
import React from 'react';
import './App.css';
import Product from './product';
import httpService from './services/http-service';
import logo from './logo.svg';

const http = new httpService();

// Map of local images (match your products)
const localImages = [
  'product1.jpg',
  'product2.jpg',
  'product3.jpg',
  'product4.jpg',
  // add more as needed
];

class App extends React.Component {
  state = { products: [] };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    http.getProducts()
      .then(data => {
        const productsWithImages = data.map((p, index) => ({
          ...p,
          // use API image if available, else use localImages array
          image: p.image && p.image !== ''
            ? p.image
            : `${process.env.PUBLIC_URL}/images/${localImages[index] || 'placeholder.jpg'}`
        }));
        this.setState({ products: productsWithImages });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to the Swag Shop</h2>
        </div>

        <div className="container mt-4">
          <div className="row">
            {this.state.products.map((p, i) => (
              <div className="col-md-4" key={p._id || i}>
                <Product product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;