import React from "react";

const Quote = () => {
  return (
    <div className="quote-container">
      <div className="quote-grid">
        {/* Quote Section */}
        <div className="quote-text-section">
          <p className="quote-text">
            &quot; I always get to where I’m going by walking away from where I
            have been.&quot;
          </p>
          <span className="quote-author">— Winnie the Pooh, A.A. Milne</span>
        </div>

        {/* Image Section */}
        <div className="quote-image-section">
          <img
            src="https://cdn.pixabay.com/photo/2019/11/29/17/05/hand-4661763_1280.jpg"
            alt="Hand with rainbow light"
            className="quote-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Quote;
