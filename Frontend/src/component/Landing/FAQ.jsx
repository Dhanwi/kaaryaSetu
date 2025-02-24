"use client";
import React, { useState } from "react";
import {
  FaRocket,
  FaLightbulb,
  FaBullseye,
  FaSearch,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const faqs = [
  {
    question: "What makes this platform unique for job seekers?",
    answer:
      "Our platform provides AI-powered cold emailing, exclusive resume review prompts, HR contact details, and personalized job search assistance. These features are designed to give you a competitive edge in your job hunt. You can leverage our tools to streamline your job search process, making it more efficient and effective.",
    icon: <FaRocket className="text-cyan-400" />,
  },
  {
    question: "How does the AI-generated cold mail feature work?",
    answer:
      "You can generate customized cold emails based on job descriptions, HR details, and your profile. Modify these emails as needed and send them directly to hiring managers or request referrals effortlessly. This feature helps you make a strong first impression and increases your chances of getting noticed by potential employers.",
    icon: <FaLightbulb className="text-cyan-400" />,
  },
  {
    question: "Can I really use all features for free?",
    answer:
      "Yes! For the first 14 days, you get full access to our premium tools at no cost—no risk, no hidden charges. This trial period allows you to explore all the features and see how they can benefit your job search before committing to a subscription.",
    icon: <FaBullseye className="text-cyan-400" />,
  },
  {
    question: "How does resume optimization work?",
    answer:
      "We provide exclusive AI-generated suggestions to refine your resume, highlight key skills, and ensure your application stands out in front of recruiters. Our tools analyze your resume and offer actionable insights to improve its effectiveness, making you a more attractive candidate.",
    icon: <FaSearch className="text-cyan-400" />,
  },
  {
    question: "Will I get job notifications or recommendations?",
    answer:
      "Yes! We feature top industry jobs, offer WhatsApp group support, and provide one-on-one career guidance to help you make informed job applications. Our platform keeps you updated with the latest job opportunities and provides personalized recommendations based on your profile.",
    icon: <FaEnvelope className="text-cyan-400" />,
  },
  {
    question: "Can I get personalized support?",
    answer:
      "Absolutely! Our team is available to answer queries, provide resume-building guidance, and even arrange meetups for freshers seeking career direction. We are committed to supporting you throughout your job search journey and helping you achieve your career goals.",
    icon: <FaPhone className="text-cyan-400" />,
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-16 px-6 md:px-16 bg-[#02101E] text-white text-center">
      <h2 className="text-4xl font-extrabold text-cyan-400">
        Frequently Asked Questions
      </h2>
      <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-4">
        Find answers to common queries about how our AI-powered job search
        assistant works.
      </p>

      {/* FAQ Cards */}
      <div className="mt-10 max-w-4xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#041124] border border-cyan-500/40 rounded-lg shadow-xl shadow-cyan-500/20 p-5 text-left cursor-pointer transition-all duration-300"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                {faq.icon}
                <h3 className="text-lg font-semibold text-cyan-400">
                  {faq.question}
                </h3>
              </div>
              <span className="text-cyan-300">
                {openIndex === index ? "▲" : "▼"}
              </span>
            </div>
            {openIndex === index && (
              <p className="mt-3 text-gray-300">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
