/*FOMO Section

Headline:"Don’t Miss Out on Your Next Big Opportunity!"

Content:"Jobs this good don’t stay open forever. Find your perfect role today, before someone else does."

CTA Button:"Join the Job Revolution"

 */
import React from "react";
import { FomoText } from "../../constants/Constants";
import { TextGenerateEffect } from "../ui/text-generate-effect";

const Fomo = () => {
  return (
    <div className=" flex flex-col text-white bg-[#7F59E5] rounded-r-full shadow-lg shadow-gray-800 p-10 border border-white border-b-4 border-t-0">
      <div className="text-center">Fear Of Missing Out</div>
      <h1 className=" text-2xl text-center md:text-4xl mb-3 mt-5 font-bold">
        <TextGenerateEffect words={FomoText} />
      </h1>
      <div className=" flex flex-col gap-3 mt-8 text-start md:text-xl">
        <div className="">
          Jobs this good don’t stay open forever. Find your{" "}
          <span className=" font-black ">perfect role </span> today, before
          someone else does.
        </div>
      </div>
      <div className=" flex items-start justify-start md:justify-center md:items-center">
      <button className="bg-[#4496FE] rounded-full shadow-lg shadow-gray-800 text-lg text-white border border-white border-b-2 border-t-0 p-2 mt-5 flex items-center gap-2 pl-5 mb-8">
        🤝Join the Job Revolution😎
        <img src="/images/svg/arrow.svg" alt="arrow" className="h-5 w-10" />
      </button>
      </div>

      
    </div>
  );
};

export default Fomo;
