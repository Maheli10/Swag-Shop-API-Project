import React from 'react';

const features = [
  {
    title: 'Premium Quality',
    text: 'Curated products built with exceptional materials and attention to detail.',
  },
  {
    title: 'Fast Delivery',
    text: 'Express shipping on every order so your favorites arrive quickly.',
  },
  {
    title: 'Secure Payment',
    text: 'Shop with confidence using encrypted, trusted checkout every time.',
  },
];

function WhyChooseUs() {
  return (
    <section id="about" className="why-section">
      <h2 className="section-title">Why Choose Us</h2>
      <div className="why-grid">
        {features.map((feature) => (
          <div className="why-card" key={feature.title}>
            <span className="why-card__icon">✓</span>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;
