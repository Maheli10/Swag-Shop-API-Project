import React from 'react';
import './App.css';
import Wishlist from './components/Wishlist';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Product from './components/Product';
import WhyChooseUs from './components/WhyChooseUs';
import InstagramGallery from './components/InstagramGallery';
import Footer from './components/Footer';
import HttpService from './services/http-service';

const http = new HttpService();

const localImages = [
  'headset.jpg',
  'smartwatch.jpg',
  'keyboard.jpg',
  'jbl.jpg',
  'mouse.jpg',
];

class App extends React.Component {
  state = { products: [], wishlist: [], cart: [], showWishlist: false, showCart: false, error: null, loading: true };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    http.getProducts()
      .then((data) => {
        const productsWithImages = data.map((p, index) => ({
          ...p,
          image: p.image && p.image !== ''
            ? p.image
            : `${process.env.PUBLIC_URL}/images/${localImages[index % localImages.length]}`,
        }));
        this.setState({ products: productsWithImages, error: null, loading: false });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          error: 'Could not load products. Make sure the API is running.',
          loading: false,
        });
      });
  };

  // Wishlist & Cart handlers
  addToWishlist = (product) => {
    this.setState((prev) => ({
      wishlist: [...prev.wishlist, product],
    }));
  };

  addToCart = (product) => {
    this.setState((prev) => ({
      cart: [...prev.cart, { ...product, quantity: 1 }],
    }));
  };

  removeFromWishlist = (id) => {
    this.setState((prev) => ({
      wishlist: prev.wishlist.filter((p) => p._id !== id),
    }));
  };

  removeFromCart = (id) => {
    this.setState((prev) => ({
      cart: prev.cart.filter((p) => p._id !== id),
    }));
  };

  moveToCart = (id) => {
    this.setState((prev) => {
      const item = prev.wishlist.find((p) => p._id === id);
      if (!item) return {};
      return {
        wishlist: prev.wishlist.filter((p) => p._id !== id),
        cart: [...prev.cart, { ...item, quantity: 1 }],
      };
    });
  };

  toggleWishlist = () => {
    this.setState((prev) => ({ showWishlist: !prev.showWishlist }));
  };

  toggleCart = () => {
    this.setState((prev) => ({ showCart: !prev.showCart }));
  };

  render() {
    const { products, error, loading, wishlist, cart, showWishlist, showCart } = this.state;

    return (
      <div className="App">
        <Navbar
          wishlistCount={wishlist.length}
          cartCount={cart.length}
          onToggleWishlist={this.toggleWishlist}
          onToggleCart={this.toggleCart}
        />
        <Hero />

        <section id="products" className="products-section">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">Handpicked essentials for your everyday setup</p>

          {error && <div className="alert">{error}</div>}

          {loading ? (
            <p className="products-status">Loading products...</p>
          ) : (
            <div className="products">
              {products.length > 0 ? (
                products.map((p) => (
                  <Product
                    key={p._id}
                    product={p}
                    addToWishlist={this.addToWishlist}
                    addToCart={this.addToCart}
                  />
                ))
              ) : (
                <p className="products-status">No products yet. Add some via the API.</p>
              )}
            </div>
          )}
        </section>

        <Wishlist
          visible={showWishlist}
          items={wishlist}
          onClose={this.toggleWishlist}
          onRemove={this.removeFromWishlist}
          onMoveToCart={this.moveToCart}
        />
        <Cart
          visible={showCart}
          items={cart}
          onClose={this.toggleCart}
          onRemove={this.removeFromCart}
        />

        <WhyChooseUs />
        <InstagramGallery />
        <Footer />
      </div>
    );
  }
}

export default App;
