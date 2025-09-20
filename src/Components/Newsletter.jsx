import React from "react";

const Newsletter = () => {
  return (
    <div className="newsletter-container">
      <h2 className="newsletter-heading">Join the Conversations</h2>
      <p className="newsletter-subheading">
        Get the content you need, just when you need it
      </p>

      <form className="newsletter-form">
        <div className="newsletter-input-row">
          <div className="newsletter-input-group">
            <label className="newsletter-label">First Name *</label>
            <input type="text" className="newsletter-input" />
          </div>

          <div className="newsletter-input-group">
            <label className="newsletter-label">Last Name *</label>
            <input type="text" className="newsletter-input" />
          </div>
        </div>

        <div className="newsletter-input-group">
          <label className="newsletter-label">Email *</label>
          <input type="email" className="newsletter-input" />
        </div>

        <div className="newsletter-checkbox">
          <input type="checkbox" className="newsletter-checkbox-input" />
          <span className="newsletter-checkbox-label">
            Yes, subscribe me to your newsletter. *
          </span>
        </div>

        <button type="submit" className="newsletter-button">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
