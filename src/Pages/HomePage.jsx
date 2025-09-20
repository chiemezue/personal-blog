import React from "react";
import HeroSection from "../Components/HeroSection";
import RecentPost from "../Components/RecentPost";
import Quote from "../Components/Quote";
import Pictures from "../Components/Pictures";
import Newsletter from "../Components/Newsletter";
import PageSection from "../Components/PageSection";

const HomePage = () => {
  return (
    <>
      <PageSection>
        <HeroSection />
      </PageSection>
      <RecentPost />
      <PageSection>
        <Quote />
      </PageSection>
      <PageSection>
        <Pictures />
      </PageSection>
      <PageSection>
        <Newsletter />
      </PageSection>
    </>
  );
};

export default HomePage;
