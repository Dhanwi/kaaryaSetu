/*

Features Section

Headline:"What Makes Us the Netflix of Job Hunting?"

Features List:

Job Gems Only: No irrelevant listings. Every job pays above average.

Tailored Suggestions: Smart algorithms to match you with the right opportunities.

One-Click Cold Mailing: Craft and send professional emails in seconds.

Stress-Free Experience: Memes included, because job hunting shouldn’t be boring.

Visuals:Icons for each feature: treasure map, smart bot, email rocket, laughing emoji.

 */
import React from "react";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { FeaturesText } from "../../constants/Constants";

const Features = () => {
  return (
    <div className="text-center bg-white p-10 ">
      <div className="">Features</div>
      <h1 className=" text-2xl md:text-4xl mb-3 mt-2 font-bold">
        <TextGenerateEffect words={FeaturesText} />
      </h1>
      <div className=" flex flex-col gap-3 mt-8 text-start md:text-center md:text-xl">
        <div className="">
          <span className=" font-black text-cyan-400">1. Job Gems Only:</span>{" "}
          No irrelevant listings. Every job pays above average.
        </div>
        <div>
          <span className=" font-black text-cyan-400">
            2. Tailored Suggestions:{" "}
          </span>{" "}
          Smart algorithms to match you with the right opportunities.
        </div>
        <div></div>
        <div>
          {" "}
          <span className=" font-black text-cyan-400">
            3. Stress-Free Experience:{" "}
          </span>{" "}
          Memes included, because job hunting shouldn’t be boring.
        </div>
      </div>

      <div className="flex flex-col justify-center mt-5 items-center">
        <div className=" bg-cyan-500 h-[30vh] w-[70vw] md:h-[45vh] lg:h-[60vh] lg:w-[50vw]  rounded-3xl shadow-lg shadow-gray-600 ">
          <img src="/images/Cold Mailing.gif" alt="gif" className="h-[30vh] w-[70vw] md:h-[44vh] md:w-[70vw] lg:h-[60vh] lg:w-[50vw] p-7" />
        </div>
        <div className=" relative bg-cyan-600 mt-2 h-[5vh] w-[80vw] md:w-[75vw] lg:w-[55vw] rounded-3xl shadow-lg shadow-gray-600 items-center flex justify-center">
          <div className=" absolute bg-cyan-500 h-[4vh] w-[4vw] rounded-3xl shadow-lg shadow-gray-900 ">
            <div className=" absolute bg-cyan-500 h-[4vh] w-[4vw] rounded-3xl shadow-lg shadow-gray-900 "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
