import React, { useState, useEffect } from "react";
import axios from "axios";
import ModelSelector from "./ModelSelector";
import RecruiterPrompt from "./RecruiterPrompt";
import AIGeneratedPrompt from "./AIGeneratedPrompt";
import apiList, { server } from "../../lib/apiList";
import PropType from "prop-types";
import { FaRegCopy, FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import icons

const ColdMail = ({ jobDetails }) => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [coldMailPrompt, setColdMailPrompt] = useState(
    "Click the button above to generate a cold mail prompt"
  );
  const [models, setModels] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [userName, setUserName] = useState("");
  const [credits, setCredits] = useState(2);
  const [copied, setCopied] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [resumeFile, setResumeFile] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get(apiList.models);
        setModels(response.data.models);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };
    const fetchUserData = async () => {
      try {
        const response = await axios.get(apiList.user, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserName(response.data.name || "");
        setUserEmail(response.data.email || "");
        if (response.data.dailyCredits) {
          setCredits(response.data.dailyCredits);
        }
        if (response.data.resume) {
          setResumeFile(response.data.resume);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchJobDescription = async () => {
      try {
        const response = await axios.get(`${apiList.jobs}/${jobDetails._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setJobDescription(response.data.jobDescription || "");
      } catch (error) {
        console.error("Error fetching job description:", error);
      }
    };

    fetchModels();
    fetchUserData();
    fetchJobDescription();
  }, [jobDetails._id]);

  // Fetch credits on page load
  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await axios.get(apiList.credits, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCredits(response.data.credits); // ✅ Set state only after data is received
      } catch (error) {
        console.error("Error fetching user credits:", error);
        setCredits(0); // ✅ Prevent disappearing credits by defaulting to 0
      }
    };

    fetchCredits();
  }, []);

  const generateColdMailPrompt = async () => {
    if (!selectedModel) {
      alert("Please select a model first!");
      return;
    }

    if (credits < 1) {
      alert(
        "You have reached your credit limit for today. You can use free exclusive prompt."
      );
      return;
    }

    setCredits((prevCredits) => Math.max(prevCredits - 1, 0));

    try {
      const response = await axios.post(
        `${server}/ai/${selectedModel.id}/generate-prompt`,
        {
          jobDescription: jobDetails.jobDescription,
          userName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setColdMailPrompt(response.data.prompt);
      setCredits(response.data.credits); // ✅ Ensure backend value is updated
    } catch (error) {
      console.error("Error generating cold mail prompt:", error);
      setCredits((prevCredits) => prevCredits + 1); // ✅ Restore credit if API call fails
    }
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < jobDetails.prompts.length - 1) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-[#02101E] text-[#22D3EE]">
      <div className="flex justify-center mb-4">
        <ModelSelector models={models} onModelSelect={setSelectedModel} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-7">
        <RecruiterPrompt
          jobDetails={jobDetails}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          copied={copied}
          setCopied={setCopied}
          icon={<FaRegCopy className="text-[#06B6D4]" />} // Use icon with color
        />
        <AIGeneratedPrompt
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          userName={userName}
          setUserName={setUserName}
          generateColdMailPrompt={generateColdMailPrompt}
          coldMailPrompt={coldMailPrompt}
          copied={copied}
          setCopied={setCopied}
          credits={credits}
          icon={<FaRegCopy className="text-[#06B6D4]" />} // Use icon with color
        />
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange("prev")}
          className="text-[#0891B2] hover:text-[#06B6D4]"
        >
          <FaArrowLeft /> Previous
        </button>
        <button
          onClick={() => handlePageChange("next")}
          className="text-[#0891B2] hover:text-[#06B6D4]"
        >
          Next <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

ColdMail.propTypes = {
  jobDetails: PropType.object.isRequired,
};

export default ColdMail;
