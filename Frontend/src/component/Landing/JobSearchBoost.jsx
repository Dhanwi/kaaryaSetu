"use client";
import React from "react";
import { default as isAuth } from "../../lib/isAuth";
import { FaRocket, FaLock, FaStar, FaRegStar } from "react-icons/fa";

export default function JobSearchBoost() {
  const handleButtonClick = () => {
    if (isAuth()) {
      window.location.href = "/jobs";
    } else {
      window.location.href = "/signup";
    }
  };

  return (
    <div className="py-16 px-6 md:px-16 bg-[#041124] text-white">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="text-center lg:text-left lg:w-1/2">
          <div className="flex items-center justify-center lg:justify-start">
            <div className="flex items-center justify-center lg:justify-start text-sm bg-cyan-200 backdrop-blur-md bg-opacity-30 rounded-full p-1 px-4 text-cyan-300 mb-2">
              <FaRegStar className="mr-1" /> Trusted by Thousands of Job Seekers
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-start">
            <h2 className="text-4xl font-extrabold text-cyan-400">
              Elevate Your Career
            </h2>
            <div className="flex items-center">
              <h2 className="text-4xl font-extrabold text-cyan-300">
                with AI-Powered Tools!
              </h2>
              <FaRocket className="ml-2 text-cyan-300" />
            </div>
          </div>

          <p className="text-lg text-gray-300 max-w-3xl mt-4 bg-[#02101E] rounded-lg py-4">
            Take your job search to the next level with{" "}
            <strong>AI-powered CV optimization</strong> and{" "}
            <strong>strategic job application guidance</strong>. Get noticed by
            recruiters faster, apply smarter, and{" "}
            <strong>secure more interviews effortlessly</strong>.
          </p>

          {/* Call-to-Action Button */}
          <div className="mt-8">
            <button
              onClick={handleButtonClick}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-md text-lg shadow-md transition-all duration-300"
            >
              Get Started for Free
            </button>
          </div>

          <p className="text-sm text-gray-400 mt-2 flex items-center justify-center lg:justify-start mb-8 lg:mb-0">
            <FaLock className="mr-1" /> 100% Secure & Risk-Free
          </p>
        </div>

        {/* User Review Card */}
        <div className="mt-12 md:mt-0 md:ml-12 max-w-lg bg-[#0b1e45] border border-cyan-500 rounded-lg shadow-xl shadow-cyan-500/20 p-6 text-left hover:shadow-cyan-500/50 transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className=" bg-gray-500 rounded-full">
              <img
                src="/images/akansha.jpg"
                alt="profile pic"
                className="rounded-full w-12 h-12 border-y-4 border-yellow-400"
              />
            </div>{" "}
            <div>
              <h4 className="text-lg font-semibold text-cyan-300">
                Akansha Singh
              </h4>
              <p className="text-gray-400 text-sm">Job Seeker</p>
            </div>
          </div>
          <p className="mt-4 text-gray-300">
            &quot;This tool was a game-changer for my job search! The{" "}
            <strong>free cold mail feature</strong> helps a lot, taking my
            application <strong>one step further</strong>, each time saving me
            hours on every application. Also, saving a lot of time searching for{" "}
            <strong> HR details and contacting</strong> them for
            referrals.&quot;
          </p>

          {/* Star Rating */}
          <div className="flex mt-4 space-x-1 text-yellow-400">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
        </div>
      </div>
    </div>
  );
}
