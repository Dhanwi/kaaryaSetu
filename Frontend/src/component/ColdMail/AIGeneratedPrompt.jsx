import React from "react";
import PropTypes from "prop-types";
import {
  FaRegSmile,
  FaRegStar,
  FaRegThumbsUp,
  FaRegLightbulb,
  FaRegHeart,
} from "react-icons/fa";

const AIGeneratedPrompt = ({
  jobDescription,
  setJobDescription,
  userName,
  setUserName,
  generateColdMailPrompt,
  coldMailPrompt,
  copied,
  setCopied,
  credits,
}) => {
  return (
    <div className="p-4 bg-[#041124] rounded shadow-xl shadow-cyan-500/20">
      <div className="flex flex-col sm:flex-row justify-between items-start md:items-center">
        <h2 className="text-lg md:text-xl font-bold mb-2 text-cyan-400">
          AI Generated Prompt
        </h2>
        <div className="text-sm bg-[#023c45] rounded-lg pl-2 py-1 text-cyan-400">
          Credits left:{" "}
          <span className="bg-[#22D3EE] text-[#02101E] rounded-lg px-2 py-1">
            {credits}
          </span>
        </div>
      </div>
      <div className="text-sm text-cyan-400 mb-5 mt-5 font-serif">
        AI at Your Service: Harness the power of AI to generate compelling cold
        mails that reflect your personality and the nuances of each job, helping
        you connect with confidence!
      </div>

      <div className="my-4">
        <div className="mb-2 text-cyan-400 font-serif">Job Description</div>
        <div className="mb-2 text-neutral-400 font-serif text-xs">
          You can modify or edit the job description
        </div>

        <textarea
          placeholder="Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="border h-[40vh] rounded-lg p-2 bg-[#020C1B] text-cyan-400 w-full mb-2 custom-scrollbar border-cyan-500/50"
        />
      </div>
      <div className="text-cyan-400 mb-0 font-serif">User Name</div>
      <div className="my-2">
        <textarea
          placeholder="Write your name here"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="placeholder-neutral-400 border bg-[#020C1B] text-cyan-400 rounded-lg p-2 w-full mb-2 custom-scrollbar border-cyan-500/50"
        />
      </div>
      <button
        onClick={generateColdMailPrompt}
        className={`px-4 py-2 rounded ${
          credits > 0
            ? "bg-[#22D3EE] text-[#092644] hover:bg-[#0891B2] shadow-cyan-500/50"
            : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }`}
        disabled={credits < 1}
      >
        Generate Cold Mail Prompt
      </button>
      <ol className="text-cyan-400 mt-4 font-serif space-y-2">
        <li>
          <FaRegSmile className="inline mr-2" /> You have {credits} credits
          remaining for prompt generation today!
        </li>
        <li>
          <FaRegStar className="inline mr-2" /> Each time you generate a prompt,
          a credit will be deducted, but don’t worry—they reset daily.
        </li>
        <li>
          <FaRegThumbsUp className="inline mr-2" /> Plus, we offer exclusive
          prompts you can choose from and use freely!
        </li>
        <li>
          <FaRegLightbulb className="inline mr-2" /> If you exceed your daily
          credit limit, there’s no need to feel down—our platform is designed to
          ensure that no barriers stand in the way of your career journey.
        </li>
        <li>
          <FaRegHeart className="inline mr-2" /> Keep pushing forward;
          opportunities await!
        </li>
      </ol>
      {credits < 1 && (
        <p className="text-red-500 mt-2">
          You have no credits left for today. Try again tomorrow or use the free
          prompt.
        </p>
      )}

      {coldMailPrompt && (
        <div className="mt-4 p-4 bg-[#020C1B] rounded border-cyan-500/50">
          <div
            className="mb-2 text-cyan-400"
            dangerouslySetInnerHTML={{ __html: coldMailPrompt }}
          />
          <button
            onClick={() => {
              const textArea = document.createElement("textarea");
              textArea.value = coldMailPrompt;
              document.body.appendChild(textArea);
              textArea.select();
              document.execCommand("copy");
              document.body.removeChild(textArea);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="bg-[#22D3EE] text-[#02101E] mt-3 px-4 py-2 rounded hover:bg-[#0891B2]"
          >
            {copied ? "Copied!" : "Copy Prompt"}
          </button>
        </div>
      )}
    </div>
  );
};

AIGeneratedPrompt.propTypes = {
  jobDescription: PropTypes.string.isRequired,
  setJobDescription: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  setUserName: PropTypes.func.isRequired,
  generateColdMailPrompt: PropTypes.func.isRequired,
  coldMailPrompt: PropTypes.string,
  copied: PropTypes.bool.isRequired,
  setCopied: PropTypes.func.isRequired,
  credits: PropTypes.number.isRequired,
};

export default AIGeneratedPrompt;
