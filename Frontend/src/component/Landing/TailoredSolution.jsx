import React from "react";
import PropTypes from "prop-types";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { TailoredSolutionText } from "../../constants/Constants";

const features = [
  {
    title: "AI-Powered Cold Mails",
    description:
      "Generate tailored cold emails that get responses from recruiters.",
    points: ["Professionally crafted", "Optimized for high engagement"],
  },
  {
    title: "Direct HR Contact Access",
    description:
      "Skip the waiting game—reach HRs directly via verified emails & LinkedIn.",
    points: ["Exclusive access", "High response rate"],
  },
  {
    title: "Personalized Resume Review",
    description:
      "Get expert insights to make your resume stand out in the crowd.",
    points: ["AI feedback & expert suggestions", "ATS-friendly optimization"],
  },
  {
    title: "Exclusive High-Paying Jobs",
    description:
      "Access hand-picked roles from companies with low competition & great pay.",
    points: ["Hidden opportunities", "Verified job listings"],
  },
];

const TailoredSolution = () => {
  return (
    <div className="bg-[#041124] overflow-hidden flex flex-col mt-10 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="relative flex flex-col items-center justify-center">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white z-10">
          Tailored Solution
        </h2>
        <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white z-10 mb-6 sm:mb-8 md:mb-10 mt-4">
          <TextGenerateEffect words={TailoredSolutionText} />{" "}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 relative z-10 py-6 sm:py-8 md:py-10 max-w-7xl mx-auto gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Feature = ({ title, description, icon, points, index }) => {
  const baseClasses =
    "flex flex-col py-6 sm:py-8 md:py-10 relative group/feature dark:border-neutral-800";
  const borderClasses = [
    index === 0 || index === 4 ? "lg:border-l" : "",
    index < 4 ? "lg:border-b" : "",
    "lg:border-r",
  ].join(" ");

  return (
    <div className={`${baseClasses} ${borderClasses}`}>
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-600 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-400 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-4 sm:px-6 md:px-8 lg:px-10 text-white dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg sm:text-xl md:text-2xl font-bold mb-2 relative z-10 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm sm:text-base md:text-lg text-white dark:text-neutral-300 max-w-xs relative z-10 mb-4 px-4 sm:px-6 md:px-8 lg:px-10">
        {description}
      </p>
      <ul className="list-disc list-inside text-[#ccfbf1] dark:text-neutral-300 max-w-xs relative z-10 px-4 sm:px-6 md:px-8 lg:px-10">
        {points.map((point, idx) => (
          <li key={idx}>{point}</li>
        ))}
      </ul>
    </div>
  );
};

Feature.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.node,
  points: PropTypes.array,
  index: PropTypes.number,
};

export default TailoredSolution;
