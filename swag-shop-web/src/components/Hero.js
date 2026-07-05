import React from 'react';

function Hero() {
  const heroImage = `${process.env.PUBLIC_URL}/images/headset.jpg`;

  return (
    <section
      id="home"
      className="hero"
      style={{ backgroundImage: `linear-gradient(rgba(17, 17, 17, 0.45), rgba(17, 17, 17, 0.55)), url(${heroImage})` }}
    >
      <div className="hero-content">
        <span className="hero__eyebrow">New Collection 2026</span>
        <h1>Discover Premium Products</h1>
        <p>Simple. Modern. Designed for everyday life.</p>
        <a href="#products" className="hero__btn">Shop Now</a>
      </div>
    </section>
  );
}

export default Hero;
