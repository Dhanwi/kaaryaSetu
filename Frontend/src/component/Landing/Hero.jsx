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
          <div className="flex flex-col md:flex-row gap-3 md:gap-10 mt-24 w-full">
            <div className="flex justify-center md:justify-end w-full">
              <a
                href="https://t.co/JttoLs8w0t"
                className="flex items-center justify-center border-y-2 hover:border-x-2 hover:border-y-0 text-black text-md font-bold px-3 py-2 bg-[#dce00d] rounded-full rounded-tl-full"
              >
                <span className="ml-2 hover:underline flex items-center">
                  Join KaaryaSetu Updates
                  <img src="/images/svg/Whatsapp.svg" className="mx-1" />
                  Group
                </span>
                <img src="/images/svg/group.svg" className="ml-1"></img>
              </a>
            </div>
            <div className="flex justify-center md:justify-start w-full">
              <a
                href="https://t.co/JttoLs8w0t"
                className="flex items-center justify-center text-black text-md border-y-2 hover:border-x-2 hover:border-y-0 font-bold px-3 py-2 bg-[#dce00d] rounded-full"
              >
                <span className="ml-2 hover:underline flex items-center">
                  Join KaaryaSetu Discussion
                  <img src="/images/svg/Whatsapp.svg" className="mx-1" />
                  Group
                </span>
                <img src="/images/svg/group.svg" className="ml-1"></img>
              </a>
            </div>
          </div>
          <div className="hero-text p-6 flex flex-col justify-center items-center">
            <div className="flex w-2/3 lg:w-1/2 items-center justify-center text-center">
              <div className="text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl mb-10 font-bold">
                <TextGenerateEffect words={heroText} />
              </div>
            </div>

            <div className="search_box_container flex justify-center items-center">
              <div className="search rounded-full h-12 lg:h-16 w-[80vw] md:w-[48vw] lg:w-[25vw] bg-white sm:text-xl flex justify-center items-center md:p-5 gap-2 font-bold">
                <div className="search_icon w-1/4 flex justify-center">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="text-black text-3xl"
                  />
                </div>
                <div className="w-3/4 flex justify-start">
                  <FlipWords words={heroFlipWords} />
                </div>
              </div>
            </div>

            <div className="hiring_box flex justify-center items-center lg:w-[60vw] mt-10 sm:mb-1 lg:mb-4">
              <div className="text-shadow-effect flex items-center bg-[#041124] bg-opacity-20 backdrop-blur-sm border-y-2 rounded-2xl text-[#c7efde] lg:text-lg font-bold p-4">
                <FontAwesomeIcon icon={faUnlockAlt} className="mr-2" />
                Unlock for free, the exclusive high-paying jobs with low
                competition—plus AI-powered cold mails, HR contacts, and
                personalized resume reviews, all in one place!
              </div>
            </div>
            {isAuth() ? (
              <a
                href="/jobs"
                className="bg-[#0abc2e] text-white font-bold px-4 py-2 rounded-lg mt-4"
              >
                Explore dream jobs
              </a>
            ) : (
              <a
                href="/signup"
                className="bg-[#0abc2e] text-white font-bold px-4 py-2 rounded-lg mt-4"
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
