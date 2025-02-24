import React from "react";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { RealChallengesText } from "../../constants/Constants";
import {
  FaClock,
  FaQuestionCircle,
  FaFileAlt,
  FaUserTimes,
  FaExclamationTriangle,
} from "react-icons/fa";

const RealChallenges = () => {
  return (
    <div className="bg-[#041124] overflow-hidden flex flex-col mt-10 p-10">
      <div className="relative flex flex-col items-center justify-center">
        <div className="absolute mb-10 -z-1">
          <div
            className=""
            style={{
              height: "450px",
              width: "450px",
              background:
                "radial-gradient(77.5% 77.5% at 70% 27.5%, #5DDECB 0%, rgba(93, 222, 203, 0) 100%)",
              filter: "blur(70px)",
            }}
          ></div>
        </div>
        <h1 className="text-xl font-bold text-white z-10">REAL CHALLENGES</h1>
        <p className="text-4xl font-black text-white z-10 mb-14 mt-2">
          <TextGenerateEffect words={RealChallengesText} />
        </p>
        <div className="1strow flex justify-center mb-10 items-center z-10 md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 z-10">
            <div className="bg-white backdrop-blur-lg bg-opacity-0 p-6 border-y-2 rounded-lg text-white shadow-xl shadow-black">
              <p className="text-[#2ba495] text-lg flex items-center">
                <FaClock className="mr-2" /> 3-4 hours per application
              </p>
              <h2 className="text-xl mt-2 font-bold">Endless Job Hunting</h2>
              <p className="mt-3">
                Finding high-paying jobs with low competition feels like
                searching for a needle in a haystack.
              </p>
            </div>
            <div className="bg-white backdrop-blur-lg bg-opacity-0 p-6 border-y-2 rounded-lg text-white shadow-xl shadow-black">
              <p className="text-[#000000] text-lg flex items-center">
                <FaQuestionCircle className="mr-2" /> Not sure where to start?
              </p>
              <h2 className="text-xl mt-2 font-bold">Cold Outreach Confusion</h2>
              <p className="mt-3">
                Not sure how to contact HR or write a compelling cold email?
                Most candidates miss out simply because they don’t know where to
                start.
              </p>
            </div>
            <div className="bg-white backdrop-blur-lg bg-opacity-0 p-6 border-y-2 rounded-lg text-white shadow-xl shadow-black">
              <p className="text-[#2ba495] text-lg flex items-center">
                <FaFileAlt className="mr-2" /> Generic resumes don&apos;t work
              </p>
              <h2 className="text-xl mt-2 font-bold">Resume Rejections</h2>
              <p className="mt-3">
                A generic resume isn’t enough. Without AI-powered
                personalization, your application may never get noticed.
              </p>
            </div>
          </div>
        </div>
        <div className="2ndrow flex justify-center items-center md:w-1/2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 z-10">
            <div className="bg-white backdrop-blur-lg bg-opacity-0 p-6 border-y-2 rounded-lg text-white shadow-xl shadow-black mx-auto">
              <p className="text-[#2ba495] text-lg flex items-center">
                <FaUserTimes className="mr-2" /> Lost in the void
              </p>
              <h2 className="text-xl mt-2 font-bold">No Direct HR Access</h2>
              <p className="mt-3">
                Applying through portals often leads to zero responses. Without
                direct HR contacts, your application might be lost in the void.
              </p>
            </div>
            <div className="bg-white backdrop-blur-lg bg-opacity-0 p-6 border-y-2 rounded-lg text-white shadow-xl shadow-black mx-auto">
              <p className="text-[#2ba495] text-lg flex items-center">
                <FaExclamationTriangle className="mr-2" /> Poor preparation
              </p>
              <h2 className="text-xl mt-2 font-bold">
                Missed Interview Opportunities
              </h2>
              <p className="mt-3">
                73% of candidates fail interviews due to poor preparation, lack
                of insights, and no structured feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealChallenges;
