"use client";
import React from "react";
import { HoverEffect } from "../ui/card-hover-effect";
import {
  FaSearch,
  FaPaperPlane,
  FaClipboardList,
  FaEnvelope,
  FaUserTie,
  FaFileAlt,
  FaRocket,
} from "react-icons/fa";
import { HowItWorksText } from "../../constants/Constants";
import { TextGenerateEffect } from "../ui/text-generate-effect";

const content = [
  {
    title: "Discover Exclusive Job Listings",
    description:
      "Browse hand-picked, high-paying jobs with low competition. Use advanced filters to find the perfect role that fits your skills and goals.",
    content: (
      <div className="h-full w-full flex items-start text-[#fff] text-sm">
        <ul>
          <li>• Verified listings</li>
          <li>• Low-competition, high-paying opportunities</li>
        </ul>
      </div>
    ),
    icon: <FaSearch className="text-2xl text-cyan-400" />,
  },
  {
    title: "Apply with Ease",
    description:
      "Click 'Apply' to be instantly redirected to the official job posting. Complete the application process on the employer’s website with all details pre-accessible, ensuring a seamless experience.",
    content: (
      <div className="h-full w-full flex items-start text-[#fff] text-sm">
        <ul>
          <li>• Direct access to job application pages</li>
          <li>• No hidden steps—apply hassle-free</li>
        </ul>
      </div>
    ),
    icon: <FaPaperPlane className="text-2xl text-cyan-400" />,
  },
  {
    title: "Track Your Applications",
    description:
      "Easily manage and revisit all the jobs you've applied for in the Application Dashboard—your personal job tracker.",
    content: (
      <div className="h-full w-full flex items-start text-[#fff] text-sm">
        <ul>
          <li>• Organized job applications</li>
          <li>• Quick access to next steps</li>
        </ul>
      </div>
    ),
    icon: <FaClipboardList className="text-2xl text-cyan-400" />,
  },
  {
    title: "Craft Powerful Cold Mails",
    description:
      "Increase your chances with AI-powered, ready-to-send cold mails—fully customizable and pre-filled with job details.",
    content: (
      <div className="h-full w-full flex items-start text-[#fff] text-sm">
        <ul>
          <li>• Free exclusive cold mail prompts</li>
          <li>• AI-generated cold mails tailored for each job</li>
        </ul>
      </div>
    ),
    icon: <FaEnvelope className="text-2xl text-cyan-400" />,
  },
  {
    title: "Get Direct HR Contacts & Referrals",
    description:
      "Access verified HR emails & LinkedIn profiles to reach recruiters directly—no more waiting for replies through job portals.",
    content: (
      <div className="h-full w-full flex items-start text-[#fff] text-sm">
        <ul>
          <li>• Request referrals with ease</li>
          <li>• Personalized HR outreach</li>
        </ul>
      </div>
    ),
    icon: <FaUserTie className="text-2xl text-cyan-400" />,
  },
  {
    title: "Request a Resume Review",
    description:
      "Before sending your cold mail, get a professional resume review tailored to your target job.",
    content: (
      <div className="h-full w-full flex items-start text-[#fff] text-sm">
        <ul>
          <li>• Pre-framed review request email</li>
          <li>• Optimized for better job match</li>
        </ul>
      </div>
    ),
    icon: <FaFileAlt className="text-2xl text-cyan-400" />,
  },
  {
    title: "Send, Follow Up & Get Noticed!",
    description:
      "Once your cold mail and resume are ready, send them directly to recruiters for higher response rates and faster hiring.",
    content: (
      <div className="h-full w-full flex items-start text-[#fff] text-sm">
        <ul>
          <li>• Proven strategy for better job search success</li>
          <li>• Stand out from the crowd</li>
        </ul>
      </div>
    ),
    icon: <FaRocket className="text-2xl text-cyan-400" />,
  },
];

export default function HowItworks() {
  return (
    <div className="bg-[#041124] overflow-hidden flex flex-col mt-5 p-10">
      <div className="relative flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold text-white z-10">
          Your Smart Job Search Process
        </h2>
        <p className="text-3xl font-black text-white z-10 mb-10 mt-4">
          <TextGenerateEffect words={HowItWorksText} />{" "}
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <HoverEffect items={content} />
      </div>
    </div>
  );
}
