import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-grid">
        {/* Logo & About */}
        <div className="footer-col">
          <h2 className="footer-logo">Inner Pieces</h2>
          <p className="footer-text">
            Thoughts on Lifestyle & Mental Health. Sharing insights, stories,
            and resources to help you live a balanced life.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li>
              <Link to="/" className="footer-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="footer-link">
                About
              </Link>
            </li>
            <li>
              <Link to="/blog" className="footer-link">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" className="footer-link">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-col">
          <h3 className="footer-title">Resources</h3>
          <ul className="footer-links">
            <li>
              <Link to="/resources" className="footer-link">
                Library
              </Link>
            </li>
            <li>
              <Link to="/shop" className="footer-link">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/cart" className="footer-link">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/faq" className="footer-link">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h3 className="footer-title">Contact</h3>
          <p className="footer-text">123 Nursing Street, Enugu, Nigeria</p>
          <p className="footer-text">Email: support@example.com</p>
          <p className="footer-text">Phone: +234 812 345 6789</p>
        </div>
      </div>

      {/* Divider */}
      <div className="footer-divider"></div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2025 Inner Pieces. All rights reserved.</p>
        <div className="footer-social">
          <Link to="#" className="footer-icon">
            <Facebook size={20} />
          </Link>
          <Link to="#" className="footer-icon">
            <Twitter size={20} />
          </Link>
          <Link to="#" className="footer-icon">
            <Instagram size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
