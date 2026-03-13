import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="contact-us">
      <div className="footer-container">
        
        {/* Column 1: Brand Info */}
        <div className="footer-col">
          <h2 className="footer-logo">🍕 FastBite</h2>
          <p>
            Bringing the world's flavors to your doorstep. Quality ingredients, 
            fast delivery, and a taste you'll never forget.
          </p>
        </div>
        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h3>Company</h3>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="footer-col">
          <h3>Get in Touch</h3>
          <ul>
            <li>📞 +1-212-456-7890</li>
            <li>✉️ support@bite.com</li>
            <li>📍 123 Foodie Street, NY</li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="footer-col">
          <h3>Stay Updated</h3>
          <div className="newsletter">
            <input type="email" placeholder="Enter your email" />
            <button>Join</button>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <hr />
        <p style={{ color: '#000000' }}>© 2026 FastBite Inc. - All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;