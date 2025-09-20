import React from "react";

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-grid">
        {/* Left Image */}
        <div className="flex justify-center">
          <img
            src="https://cdn.pixabay.com/photo/2014/10/16/20/00/woman-491623_1280.jpg"
            alt="Dena"
            className="about-image"
          />
        </div>

        {/* Right Text */}
        <div className="text-left">
          <h1 className="about-title">Hi! I’m Dena,</h1>
          <h2 className="about-subtitle">
            A mental health advocate, storyteller & lifestyle blogger
          </h2>
          <p className="about-paragraph">
            Welcome to my little corner of the internet. I’m deeply passionate
            about creating honest conversations around mental health,
            self-growth, and finding joy in everyday life. My mission is to
            remind people that they are not alone in their struggles, and that
            healing is a journey worth taking. Through my blogs, I share
            personal experiences, practical wellness tips, and thoughtful
            reflections that I hope will inspire you to embrace your own story
            with courage and kindness.
          </p>
          <p className="about-paragraph">
            Beyond writing, I enjoy connecting with individuals who are also
            navigating life’s ups and downs. Whether it’s through mindful
            living, creative expression, or simply learning to pause and
            breathe, I believe in building a community where empathy and
            authenticity thrive. My goal is not just to write words but to spark
            meaningful change in the way we care for ourselves and one another.
          </p>
          <p className="about-paragraph">
            When I’m not blogging, you’ll probably find me reading in a cozy
            corner, exploring new cities, or sipping coffee at a local café
            while people-watching. I’m so glad you’re here, and I’d love for you
            to join me on this journey of growth, reflection, and wholehearted
            living.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
