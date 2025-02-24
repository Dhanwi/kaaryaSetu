import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { server } from "../../lib/apiList";

const ATSChecker = ({
  resumeFile,
  setResumeFile,
  atsMatch,
  setAtsMatch,
  missingKeywords,
  setMissingKeywords,
  selectedModel,
  jobDetails,
}) => {
  const handleResumeUpload = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const getResume = () => {
    if (resumeFile) {
      const address = `${server}${resumeFile}`;
      axios
        .get(address, { responseType: "blob" })
        .then((response) => {
          const file = new Blob([response.data], { type: "application/pdf" });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        })
        .catch(() => {
          alert("Error fetching resume");
        });
    } else {
      alert("No resume found");
    }
  };

  const checkATSMatch = async () => {
    if (!selectedModel) {
      alert("Please select a model first!");
      return;
    }
    if (!resumeFile) {
      alert("Please upload a resume first!");
      return;
    }
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobDescription", jobDetails.jobDescription);

    try {
      const response = await axios.post(
        `${server}/ai/${selectedModel.id}/ats-checker`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAtsMatch(response.data.matchPercentage);
      setMissingKeywords(response.data.missingKeywords);
    } catch (error) {
      console.error("Error checking ATS match:", error);
    }
  };

  return (
    <div className="my-4 gap-3">
      <input
        type="file"
        onChange={handleResumeUpload}
        className="border p-2 w-full mb-2"
      />
      {resumeFile && (
        <button
          onClick={getResume}
          className="bg-blue-500 text-white px-4 py-2 mt-2 mr-4 rounded"
        >
          View Your Uploaded Resume
        </button>
      )}
      <button
        onClick={checkATSMatch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Check ATS Match
      </button>
      {atsMatch !== null && (
        <div className="mt-4 p-4 bg-gray-200 rounded">
          <p className="mb-2">ATS Match: {atsMatch}%</p>
          {missingKeywords.length > 0 && (
            <div>
              <p>Missing Keywords:</p>
              <ul className="list-disc list-inside">
                {missingKeywords.map((keyword, index) => (
                  <li key={index}>{keyword}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

ATSChecker.propTypes = {
  resumeFile: PropTypes.object,
  setResumeFile: PropTypes.func.isRequired,
  atsMatch: PropTypes.number,
  setAtsMatch: PropTypes.func.isRequired,
  missingKeywords: PropTypes.array.isRequired,
  setMissingKeywords: PropTypes.func.isRequired,
  selectedModel: PropTypes.object,
  jobDetails: PropTypes.object.isRequired,
};

export default ATSChecker;
