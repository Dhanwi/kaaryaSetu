import React from "react";
import Hero from "../component/Landing/Hero";

// import Testimonials from "../component/Landing/Testimonials";
import HowItworks from "../component/Landing/HowItworks";
import Pricing from "../component/Landing/Pricing";
// import AboutUs from "../component/Landing/AboutUs";
import TopCompanies from "../component/Landing/TopCompanies";
import RealChallenges from "../component/Landing/RealChallenges";
import TailoredSolution from "../component/Landing/TailoredSolution";
import JobSearchBoost from "../component/Landing/JobSearchBoost";
import FAQ from "../component/Landing/FAQ";

const Landing = () => {
  return (
    <div className=" flex flex-col">
      <Hero />
      <RealChallenges />
      <TopCompanies />
      <TailoredSolution />
      <HowItworks />
      <Pricing />
      <FAQ />
      <JobSearchBoost />

      {/* <AboutUs /> */}
      {/* <Fomo /> */}

      
    </div>
  );
};

export default Landing;
