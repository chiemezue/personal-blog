import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import HeroSection from "../Components/HeroSection";
import RecentPost from "../Components/RecentPost";
import Quote from "../Components/Quote";
import Pictures from "../Components/Pictures";
import Newsletter from "../Components/Newsletter";

const HomePage = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <>
      <div data-aos="fade-up">
        <HeroSection />
      </div>

      <div data-aos="fade-right">
        <RecentPost />
      </div>

      <div data-aos="zoom-in">
        <Quote />
      </div>

      <div data-aos="fade-left">
        <Pictures />
      </div>

      <div data-aos="fade-up">
        <Newsletter />
      </div>
    </>
  );
};

export default HomePage;
