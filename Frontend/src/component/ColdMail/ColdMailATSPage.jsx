import React, { useState, useEffect } from "react";
import axios from "axios";
import ColdMail from "./ColdMail";
import ATSChecker from "./ATSChecker";
import PersonalizedMail from "./PersonalizedMail";
import HRInfo from "./HRInfo";
import apiList, { server } from "../../lib/apiList";
import PropType from "prop-types";
import { FaEnvelope, FaUserTie, FaFileAlt } from "react-icons/fa"; // Import icons

const ColdMailATSPage = ({ jobDetails }) => {
  const [selectedTab, setSelectedTab] = useState("coldMail");
  const [resumeFile, setResumeFile] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [credits, setCredits] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const [customEmail, setCustomEmail] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
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

    fetchUserData();
  }, []);

  const emailContent = `
    User ${userName} has requested a personalized mail for the following job:
    - Job Title: ${jobDetails.title}
    - Company Name: ${jobDetails.companyName}
    - Job Description: ${jobDetails.jobDescription}
    - Salary: ${jobDetails.salary}
    
    User Email: ${customEmail || userEmail}
    Resume: ${
      resumeFile ? `${server}${resumeFile}` : "Upload resume while sending mail"
    }
  `;

  return (
    <div className="container mx-auto mt-14 p-4 bg-[#02101E] text-[#22D3EE]">
      <div className="flex justify-between rounded-xl items-center text-lg w-full gap-5 mb-4">
        <button
          onClick={() => setSelectedTab("coldMail")}
          className={`flex py-2 w-full border-x-2 border-b-2 rounded-xl justify-center items-center ${
            selectedTab === "coldMail"
              ? "bg-[#041124] text-[#22D3EE] font-bold shadow-xl shadow-cyan-500/20"
              : "text-[#06B6D4]"
          }`}
        >
          <FaEnvelope className="mr-2" /> Ai Cold Mail Generation
        </button>
        <button
          onClick={() => setSelectedTab("hrDetails")}
          className={`flex py-2 w-full rounded-xl border-b-2 border-x-2 justify-center items-center ${
            selectedTab === "hrDetails"
              ? "bg-[#041124] text-[#22D3EE] font-bold shadow-xl shadow-cyan-500/20"
              : "text-[#06B6D4]"
          }`}
        >
          <FaUserTie className="mr-2" /> HR Details
        </button>
        <button
          onClick={() => setSelectedTab("personalizedMail")}
          className={`flex py-2 rounded-xl w-full border-b-2 border-x-2 justify-center items-center ${
            selectedTab === "personalizedMail"
              ? "bg-[#041124] text-[#22D3EE] font-bold shadow-xl shadow-cyan-500/20"
              : "text-[#06B6D4]"
          }`}
        >
          <FaFileAlt className="mr-2" /> Personalized Resume Review
        </button>
      </div>
      {selectedTab === "coldMail" && <ColdMail jobDetails={jobDetails} />}
      {selectedTab === "hrDetails" && <HRInfo jobDetails={jobDetails} />}
      {selectedTab === "personalizedMail" && (
        <PersonalizedMail
          resumeFile={resumeFile}
          setResumeFile={setResumeFile}
          showModal={showModal}
          setShowModal={setShowModal}
          customEmail={customEmail}
          setCustomEmail={setCustomEmail}
          emailContent={emailContent}
          handleCopy={() => {
            const textArea = document.createElement("textarea");
            textArea.value = emailContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          copied={copied}
          userEmail={userEmail}
        />
      )}
    </div>
  );
};

ColdMailATSPage.propTypes = {
  jobDetails: PropType.object.isRequired,
};

export default ColdMailATSPage;
