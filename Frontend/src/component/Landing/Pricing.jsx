"use client";
import React from "react";
import {
  FaRocket,
  FaSearch,
  FaComments,
  FaBell,
  FaTools,
  FaEnvelope,
  FaRobot,
  FaAddressCard,
  FaFileAlt,
  FaPhone,
  FaLightbulb,
  FaHandsHelping,
  FaBullseye,
} from "react-icons/fa";
import { default as isAuth } from "../../lib/isAuth";

export default function Pricing() {
  const authenticated = isAuth();

  return (
    <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-16 bg-gradient-to-r from-[#02101E] via-[#041124] to-[#020C1B] text-white">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-cyan-400">
          <FaBullseye className="inline-block mr-2 text-cyan-400" /> Unlock Your
          Dream Job with Ease!
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-white max-w-3xl mx-auto">
          Whether you&lsquo;re exploring new opportunities or need personalized
          guidance, we&lsquo;ve got you covered. For a{" "}
          <span className="text-cyan-300 font-semibold">limited time</span>,
          access all premium features for free—because your success is our
          priority.
        </p>
      </div>

      <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
        {/* Free Plan */}
        <div className="border border-cyan-500 rounded-lg shadow-xl shadow-cyan-500/20 p-4 sm:p-6 bg-[#041124] hover:shadow-cyan-500/50 transition-all duration-300">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-400">
            <FaRocket className="inline-block mr-2 text-cyan-400" /> Free Plan
          </h3>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-white">
            <li>
              <FaRocket className="inline-block mr-2 text-cyan-400" /> Access
              top job listings from high-paying hidden gems.
            </li>
            <li>
              <FaSearch className="inline-block mr-2 text-cyan-400" /> Apply
              directly with easy job application links.
            </li>
            <li>
              <FaComments className="inline-block mr-2 text-cyan-400" /> Join
              our{" "}
              <span className="text-cyan-300 font-semibold">
                WhatsApp Support Community
              </span>{" "}
              for queries.
            </li>
            <li>
              <FaBell className="inline-block mr-2 text-cyan-400" /> Get instant
              job alerts to stay ahead.
            </li>
            <li>
              <FaTools className="inline-block mr-2 text-cyan-400" /> Essential
              job search tools to optimize your applications.
            </li>
          </ul>
          <div className="mt-4 sm:mt-6 text-center">
            <button
              className="bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 transition-all duration-300 text-sm sm:text-base"
              onClick={() =>
                authenticated
                  ? (window.location.href = "/jobs")
                  : (window.location.href = "/signup")
              }
            >
              {authenticated ? "Explore Jobs" : "Sign Up Now"}
            </button>
          </div>
        </div>

        {/* Premium (Currently Free) */}
        <div className="border border-blue-500 rounded-lg shadow-xl shadow-blue-500/20 p-4 sm:p-6 bg-gradient-to-r from-[#041124] to-[#020C1B] hover:shadow-blue-500/50 transition-all duration-300">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 text-blue-400">
            <FaRocket className="inline-block mr-2 text-blue-400" /> Risk-Free
            Premium Access (Limited Time)
          </h3>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-white">
            <li>
              <FaEnvelope className="inline-block mr-2 text-blue-400" />{" "}
              <span className="text-blue-300 font-semibold">
                AI-generated cold emails
              </span>{" "}
              for recruiters.
            </li>
            <li>
              <FaRobot className="inline-block mr-2 text-blue-400" /> Choose
              your <span className="text-blue-300 font-semibold">AI model</span>{" "}
              for personalized emails.
            </li>
            <li>
              <FaAddressCard className="inline-block mr-2 text-blue-400" /> Get
              direct{" "}
              <span className="text-blue-300 font-semibold">
                HR contact info
              </span>{" "}
              for outreach & referrals.
            </li>
            <li>
              <FaFileAlt className="inline-block mr-2 text-blue-400" />{" "}
              Personalized{" "}
              <span className="text-blue-300 font-semibold">
                resume review request system
              </span>
              .
            </li>
            <li>
              <FaSearch className="inline-block mr-2 text-blue-400" />{" "}
              <span className="text-blue-300 font-semibold">
                Expert resume optimization
              </span>{" "}
              for better ATS ranking.
            </li>
            <li>
              <FaPhone className="inline-block mr-2 text-blue-400" /> 1-on-1{" "}
              <span className="text-blue-300 font-semibold">
                career guidance
              </span>{" "}
              for freshers.
            </li>
            <li>
              <FaLightbulb className="inline-block mr-2 text-blue-400" />{" "}
              Personalized mentorship for job applications.
            </li>
            <li>
              <FaHandsHelping className="inline-block mr-2 text-blue-400" />{" "}
              <span className="text-blue-300 font-semibold">
                Priority WhatsApp & email support
              </span>{" "}
              for job queries.
            </li>
            <li>
              <FaBullseye className="inline-block mr-2 text-blue-400" /> Get
              tailored{" "}
              <span className="text-blue-300 font-semibold">
                career roadmap
              </span>{" "}
              based on your skills.
            </li>
            <li>
              <FaEnvelope className="inline-block mr-2 text-blue-400" />{" "}
              Exclusive researched prompts for each job description.
            </li>
            <li>
              <FaRocket className="inline-block mr-2 text-blue-400" /> Access to
              premium job listings and hidden opportunities.
            </li>
            <li>
              <FaSearch className="inline-block mr-2 text-blue-400" /> Advanced
              job search tools and filters.
            </li>
            <li>
              <FaComments className="inline-block mr-2 text-blue-400" /> Join
              our exclusive career community for networking.
            </li>
          </ul>
          <div className="mt-4 sm:mt-6 text-center">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 text-sm sm:text-base"
              onClick={() =>
                authenticated
                  ? (window.location.href = "/jobs")
                  : (window.location.href = "/signup")
              }
            >
              {authenticated ? "Explore Premium Jobs" : "Sign Up for Premium"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mt-12 text-center">
        <p className="text-sm sm:text-base md:text-lg text-white">
          🎉 Start your journey today!{" "}
          <span className="text-cyan-300 font-semibold">
            All premium features are free
          </span>{" "}
          for a limited time—don&apos;t miss out!
        </p>
      </div>
    </div>
  );
}
