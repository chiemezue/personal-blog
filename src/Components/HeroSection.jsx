import React from "react";

const HeroSection = () => {
  return (
    <section className="hero-wrapper">
      {/* Left image */}
      <div>
        <img
          src="https://images.pexels.com/photos/4065133/pexels-photo-4065133.jpeg"
          alt="Relaxing"
          className="hero-img-left"
        />
      </div>

      {/* Blog preview */}
      <div className="hero-preview">
        <img
          src="https://cdn.pixabay.com/photo/2017/08/11/14/05/leaves-2631150_1280.jpg"
          alt="Flower"
          className="hero-img-right"
        />
        <h2 className="hero-title">Detoxing my social media feed</h2>
        <p className="hero-text">
          Create a blog post subtitle that summarizes your post in a few short,
          punchy sentences and entices your audience to continue reading....
        </p>
        <button className="hero-btn">All Posts</button>
      </div>
    </section>
  );
};

export default HeroSection;
