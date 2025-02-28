import React from "react";
import { heroFlipWords, heroText } from "../../constants/Constants";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import isAuth from "../../lib/isAuth";
import { FlipWords } from "../ui/flip-words";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  return (
    <div className="text-center text-white bg-[#041124] flex flex-col justify-center items-center">
      <div className="outer-box bg-white pb-9 h-[100vh] w-full flex flex-col justify-center items-center">
        <div
          className="hero-image relative gap-2 z-0 flex flex-col md:items-start md:justify-center"
          style={{
            background:
              "url(images/hero.jpg) 51% 38% / cover rgb(222, 222, 222)",
            width: "100%",
            height: "100%",
          }}
        >
          <div className="flex flex-col md:flex-row gap-3 md:gap-10 mt-24 w-full px-4">
            <div className="flex justify-center md:justify-end w-full">
              <a
                href="https://chat.whatsapp.com/GtPBs51IF9v362OoFfYpkA"
                className="flex items-center justify-center border-y-2 hover:border-x-2 hover:border-y-0 text-black text-sm sm:text-md font-bold px-3 py-2 bg-[#dce00d] rounded-full rounded-tl-full"
              >
                <span className="ml-2 hover:underline flex items-center">
                  Join KaaryaSetu Updates
                  <img
                    src="/images/svg/Whatsapp.svg"
                    className="mx-1 w-4 h-4 sm:w-5 sm:h-5"
                  />
                  Group
                </span>
                <img
                  src="/images/svg/group.svg"
                  className="ml-1 w-4 h-4 sm:w-5 sm:h-5"
                ></img>
              </a>
            </div>
            <div className="flex justify-center md:justify-start w-full">
              <a
                href="https://chat.whatsapp.com/DRT2bpI6y9iDM9dAHLMCUS"
                className="flex items-center justify-center text-black text-sm sm:text-md border-y-2 hover:border-x-2 hover:border-y-0 font-bold px-3 py-2 bg-[#dce00d] rounded-full"
              >
                <span className="ml-2 hover:underline flex items-center">
                  Join KaaryaSetu Discussion
                  <img
                    src="/images/svg/Whatsapp.svg"
                    className="mx-1 w-4 h-4 sm:w-5 sm:h-5"
                  />
                  Group
                </span>
                <img
                  src="/images/svg/group.svg"
                  className="ml-1 w-4 h-4 sm:w-5 sm:h-5"
                ></img>
              </a>
            </div>
          </div>
          <div className="hero-text p-4 sm:p-6 flex flex-col justify-center items-center">
            <div className="flex w-full lg:w-1/2 items-center justify-center text-center">
              <div className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 sm:mb-10 font-bold">
                <TextGenerateEffect words={heroText} />
              </div>
            </div>

            <div className="search_box_container flex justify-center items-center w-full">
              <div className="search rounded-full h-12 lg:h-16 w-[90vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] bg-white text-sm sm:text-xl flex justify-center items-center p-2 sm:p-4 gap-2 font-bold">
                <div className="search_icon w-1/4 flex justify-center">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="text-black text-2xl sm:text-3xl"
                  />
                </div>
                <div className="w-3/4 flex justify-start">
                  <FlipWords words={heroFlipWords} />
                </div>
              </div>
            </div>

            <div className="hiring_box flex justify-center items-center w-full lg:w-[60vw] mt-6 sm:mt-10 sm:mb-1 lg:mb-4">
              <div className="text-shadow-effect flex items-center bg-[#041124] bg-opacity-20 backdrop-blur-sm border-y-2 rounded-2xl text-[#c7efde] text-sm sm:text-md lg:text-lg font-bold p-3 sm:p-4">
                <FontAwesomeIcon icon={faUnlockAlt} className="mr-2" />
                Unlock for free, the exclusive high-paying jobs with low
                competition—plus AI-powered cold mails, HR contacts, and
                personalized resume reviews, all in one place!
              </div>
            </div>
            {isAuth() ? (
              <a
                href="/jobs"
                className="bg-[#0abc2e] text-white font-bold px-4 py-2 rounded-lg mt-4 text-sm sm:text-md"
              >
                Explore dream jobs
              </a>
            ) : (
              <a
                href="/signup"
                className="bg-[#0abc2e] text-white font-bold px-4 py-2 rounded-lg mt-4 text-sm sm:text-md"
              >
                Get Free Instant Access
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
