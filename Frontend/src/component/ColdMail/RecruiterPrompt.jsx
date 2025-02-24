import React from "react";
import PropTypes from "prop-types";
import { FaCopy, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const RecruiterPrompt = ({
  jobDetails,
  currentPage,
  handlePageChange,
  copied,
  setCopied,
}) => {
  return (
    <div className="py-4 px-6 bg-[#041124] border border-cyan-500/50 rounded relative shadow-xl shadow-cyan-500/20">
      <h2 className="text-xl text-cyan-400 font-bold mb-2">Prompt</h2>
      <div className="text-sm font-serif text-cyan-400 mb-5">
        Crafted for Success: Our cold mail prompts are designed to make your
        application stand out, capturing the attention of recruiters and giving
        you the competitive edge you deserve!
      </div>
      <div className="px-4">
        <textarea
          value={
            jobDetails.prompts
              ? jobDetails.prompts[currentPage]
              : "No prompts available"
          }
          readOnly
          className="border border-cyan-500/50 rounded-3xl h-[90vh] p-4 w-full bg-[#020C1B] mb-2 resize-none custom-scrollbar text-cyan-400"
        />
      </div>

      <div className="mb-5 mt-4 text-sm text-cyan-400 font-serif text-center">
        You can click on next or prev button to check all the exclusive prompts
        available for this job, and proceed with any of the best one, that suits
        you.
      </div>
      <div className="absolute top-2 right-2">
        <button
          onClick={() => {
            const textArea = document.createElement("textarea");
            textArea.value = jobDetails.prompts
              ? jobDetails.prompts[currentPage]
              : "";
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="bg-[#0891B2] text-white px-2 py-1 rounded hover:bg-[#06B6D4] flex items-center"
        >
          <FaCopy className="mr-1" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="flex justify-between mt-2">
        <button
          onClick={() => handlePageChange("prev")}
          className="bg-[#0891B2] text-white px-2 py-1 rounded hover:bg-[#06B6D4] flex items-center"
          disabled={currentPage === 0}
        >
          <FaArrowLeft className="mr-1" />
          Previous
        </button>
        <button
          onClick={() => handlePageChange("next")}
          className="bg-[#0891B2] text-white px-2 py-1 rounded hover:bg-[#06B6D4] flex items-center"
          disabled={
            currentPage ===
            (jobDetails.prompts ? jobDetails.prompts.length - 1 : 0)
          }
        >
          Next
          <FaArrowRight className="ml-1" />
        </button>
      </div>
    </div>
  );
};

RecruiterPrompt.propTypes = {
  jobDetails: PropTypes.object.isRequired,
  currentPage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  copied: PropTypes.bool.isRequired,
  setCopied: PropTypes.func.isRequired,
};

export default RecruiterPrompt;
