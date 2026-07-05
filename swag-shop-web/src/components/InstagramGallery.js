import React from 'react';

const galleryImages = [
  'headset.jpg',
  'smartwatch.jpg',
  'keyboard.jpg',
  'jbl.jpg',
  'mouse.jpg',
  'headset.jpg',
];

function InstagramGallery() {
  return (
    <section className="gallery-section">
      <h2 className="section-title">Instagram Gallery</h2>
      <p className="section-subtitle">Follow us @swagshop for daily inspiration</p>
      <div className="gallery-grid">
        {galleryImages.map((image, index) => (
          <a
            key={`${image}-${index}`}
            href="#products"
            className="gallery-item"
            aria-label={`Gallery image ${index + 1}`}
          >
            <img src={`${process.env.PUBLIC_URL}/images/${image}`} alt="" />
            <span className="gallery-item__overlay">View</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default InstagramGallery;
