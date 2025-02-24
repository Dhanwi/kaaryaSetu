/* Testimonials Section

Headline:"Real People. Real Success Stories."

Content:

"I landed my dream job in 3 days. Who knew HRs actually reply to cold emails?" – Rohan, Software Engineer.

"Saved me weeks of LinkedIn stalking! Totally worth $1." – Neha, Marketing Manager.

Visuals:Pictures of smiling professionals with short captions.

*/
import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { ShootingStars } from "../ui/shooting-stars";
import { StarsBackground } from "../ui/stars-background";
import { testimonials, TestimonialsText } from "../../constants/Constants";
import { TextGenerateEffect } from "../ui/text-generate-effect";

const Testimonials = () => {
  return (
    <div className=" relative text-center bg-[#12363B] p-10">
      <div className="text-white"> Testimonials </div>
      <h1 className=" text-white text-2xl md:text-4xl mt-2 mb-3 font-bold">
        <TextGenerateEffect words={TestimonialsText} />
      </h1>
      <div></div>

      <InfiniteMovingCards
        items={testimonials}
        // direction="right"
        speed="slow"
      />

      <ShootingStars />
      <StarsBackground />
    </div>
  );
};

export default Testimonials;
