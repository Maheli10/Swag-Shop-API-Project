import React from 'react';

const shopLinks = ['All Products', 'New Arrivals', 'Best Sellers', 'Gift Cards'];
const collectionLinks = ['Electronics', 'Accessories', 'Lifestyle', 'Limited Edition'];
const supportLinks = ['FAQ', 'Shipping', 'Returns', 'Track Order'];
const contactLinks = ['Email Us', 'Live Chat', 'Store Locator', 'Careers'];
const socialLinks = ['Instagram', 'Facebook', 'Twitter'];

function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <span className="site-footer__logo">SWAG SHOP</span>
          <p>Premium products for a modern lifestyle. Quality you can feel, design you will love.</p>
        </div>

        <div className="site-footer__columns">
          <div>
            <h4>Shop</h4>
            <ul>{shopLinks.map((link) => <li key={link}><a href="#products">{link}</a></li>)}</ul>
          </div>
          <div>
            <h4>Collections</h4>
            <ul>{collectionLinks.map((link) => <li key={link}><a href="#products">{link}</a></li>)}</ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>{supportLinks.map((link) => <li key={link}><a href="#contact">{link}</a></li>)}</ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>{contactLinks.map((link) => <li key={link}><a href="#contact">{link}</a></li>)}</ul>
          </div>
        </div>

        <div className="site-footer__social">
          {socialLinks.map((link) => (
            <a key={link} href="#contact">{link}</a>
          ))}
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>© 2026 Swag Shop. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
